import streamlit as st
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import time
import threading

@st.cache_resource
def load_model():
    tokenizer = AutoTokenizer.from_pretrained("prithivida/parrot_paraphraser_on_T5")
    model = AutoModelForSeq2SeqLM.from_pretrained("prithivida/parrot_paraphraser_on_T5")
    return tokenizer, model

def paraphrase_paragraph(text, tokenizer, model, device):
    prompt = f"paraphrase: {text} </s>"
    inputs = tokenizer.encode_plus(prompt, return_tensors="pt", padding="longest", truncation=True, max_length=512)
    input_ids = inputs["input_ids"].to(device)
    attention_mask = inputs["attention_mask"].to(device)

    output = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        max_length=512,
        do_sample=True,
        top_k=120,
        top_p=0.95,
        temperature=0.9,
        early_stopping=True,
        num_return_sequences=1
    )
    return tokenizer.decode(output[0], skip_special_tokens=True)

def humanize_text(full_text):
    tokenizer, model = load_model()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = model.to(device)

    paragraphs = [p.strip() for p in full_text.split("\n") if p.strip()]
    paraphrased = [paraphrase_paragraph(p, tokenizer, model, device) for p in paragraphs]

    return "\n\n".join(paraphrased)

# Streamlit UI
st.set_page_config(page_title="Humanize AI Text", layout="centered")
st.title("🧠 Humanize AI Text")
st.write("Make AI-generated text sound more human to evade detection.")

input_text = st.text_area("Enter AI-Generated Text", height=300)

if st.button("Humanize"):
    if input_text.strip() == "":
        st.warning("Please enter some text.")
    else:
        timer_placeholder = st.empty()
        start_time = time.time()
        stop_flag = {"stop": False}

        def update_timer():
            while not stop_flag["stop"]:
                elapsed = time.time() - start_time
                timer_placeholder.info(f"⏳ Generating... {elapsed:.1f} seconds")
                time.sleep(0.5)

        thread = threading.Thread(target=update_timer)
        thread.start()

        output = humanize_text(input_text)

        stop_flag["stop"] = True
        thread.join()
        elapsed = time.time() - start_time
        timer_placeholder.success(f"✅ Done in {elapsed:.2f} seconds!")

        st.subheader("Humanized Text")
        st.text_area("Output", value=output, height=300)

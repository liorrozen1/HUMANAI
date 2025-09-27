import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    # API Configuration
    API_VERSION = os.environ.get('API_VERSION', '1.0.0')
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
    
    # Humanization Settings
    DEFAULT_INTENSITY = float(os.environ.get('DEFAULT_INTENSITY', '0.3'))
    MAX_INTENSITY = float(os.environ.get('MAX_INTENSITY', '1.0'))
    MIN_INTENSITY = float(os.environ.get('MIN_INTENSITY', '0.0'))
    
    # Server Configuration
    HOST = os.environ.get('HOST', '0.0.0.0')
    PORT = int(os.environ.get('PORT', '5000'))





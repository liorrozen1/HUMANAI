#!/usr/bin/env python3
"""
HUMANAI Setup Script
This script helps you set up the HUMANAI project quickly.
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python():
    """Check if Python is installed"""
    print("🐍 Checking Python installation...")
    try:
        version = sys.version_info
        if version.major >= 3 and version.minor >= 8:
            print(f"✅ Python {version.major}.{version.minor}.{version.micro} is installed")
            return True
        else:
            print(f"❌ Python {version.major}.{version.minor}.{version.micro} is too old. Please install Python 3.8 or higher.")
            return False
    except Exception as e:
        print(f"❌ Python check failed: {e}")
        return False

def check_node():
    """Check if Node.js is installed"""
    print("📦 Checking Node.js installation...")
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True, check=True)
        print(f"✅ Node.js {result.stdout.strip()} is installed")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js is not installed. Please install Node.js from https://nodejs.org/")
        return False

def setup_backend():
    """Set up the Python backend"""
    print("\n🐍 Setting up Python backend...")
    
    # Check if we're in the right directory
    if not os.path.exists('backend'):
        print("❌ Backend directory not found. Please run this script from the project root.")
        return False
    
    os.chdir('backend')
    
    # Install Python dependencies
    if not run_command('pip install -r requirements.txt', 'Installing Python dependencies'):
        return False
    
    os.chdir('..')
    return True

def setup_frontend():
    """Set up the React frontend"""
    print("\n⚛️ Setting up React frontend...")
    
    # Check if we're in the right directory
    if not os.path.exists('frontend'):
        print("❌ Frontend directory not found. Please run this script from the project root.")
        return False
    
    os.chdir('frontend')
    
    # Install Node.js dependencies
    if not run_command('npm install', 'Installing Node.js dependencies'):
        return False
    
    os.chdir('..')
    return True

def create_start_scripts():
    """Create start scripts for different platforms"""
    print("\n📝 Creating start scripts...")
    
    if platform.system() == "Windows":
        # Windows batch files
        backend_script = """@echo off
echo Starting HUMANAI Backend...
cd backend
python app.py
pause
"""
        frontend_script = """@echo off
echo Starting HUMANAI Frontend...
cd frontend
npm run dev
pause
"""
        
        with open('start_backend.bat', 'w') as f:
            f.write(backend_script)
        
        with open('start_frontend.bat', 'w') as f:
            f.write(frontend_script)
        
        print("✅ Created start_backend.bat and start_frontend.bat")
    
    else:
        # Unix shell scripts
        backend_script = """#!/bin/bash
echo "Starting HUMANAI Backend..."
cd backend
python app.py
"""
        frontend_script = """#!/bin/bash
echo "Starting HUMANAI Frontend..."
cd frontend
npm run dev
"""
        
        with open('start_backend.sh', 'w') as f:
            f.write(backend_script)
        
        with open('start_frontend.sh', 'w') as f:
            f.write(frontend_script)
        
        # Make scripts executable
        os.chmod('start_backend.sh', 0o755)
        os.chmod('start_frontend.sh', 0o755)
        
        print("✅ Created start_backend.sh and start_frontend.sh")

def main():
    """Main setup function"""
    print("🚀 HUMANAI Setup Script")
    print("=" * 50)
    
    # Check prerequisites
    if not check_python():
        return False
    
    if not check_node():
        return False
    
    # Set up backend
    if not setup_backend():
        print("❌ Backend setup failed")
        return False
    
    # Set up frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        return False
    
    # Create start scripts
    create_start_scripts()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Start the backend: python backend/app.py")
    print("2. Start the frontend: cd frontend && npm run dev")
    print("3. Open http://localhost:3000 in your browser")
    print("\n💡 You can also use the start scripts created for your platform!")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

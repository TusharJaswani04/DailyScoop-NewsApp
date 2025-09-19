import google.generativeai as genai

# Setup your API key
genai.configure(api_key="AIzaSyDcbAO1BuLD2S2EKcNW1m1_srY0VjMU3Xg")

# List models
for model in genai.list_models():
    print("🔹 Model ID:", model.name)
    print("   Supports generateContent:", "generateContent" in model.supported_generation_methods)
    print("   Description:", model.description)
    print()

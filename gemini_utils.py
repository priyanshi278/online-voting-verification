import google.generativeai as genai
import base64

genai.configure(api_key="AIzaSyCiSXMHwn7q5zmHDqQtuQOtJhsWDTu2XUc")  # 🔐 Replace with your API key

def encode_image(image_file):
    return base64.b64encode(image_file.read()).decode("utf-8")

def verify_face(id_photo_file, selfie_file):
    id_base64 = encode_image(id_photo_file)
    selfie_base64 = encode_image(selfie_file)

    model = genai.GenerativeModel("gemini-pro-vision")
    response = model.generate_content([
        "Compare the two faces. Are they the same person? Answer 'yes' or 'no'.",
        {"mime_type": "image/jpeg", "data": id_base64},
        {"mime_type": "image/jpeg", "data": selfie_base64},
    ])

    result_text = response.text.lower()
    return "✅ Face Match!" if "yes" in result_text else "❌ Face Mismatch"

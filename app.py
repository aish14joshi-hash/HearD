from flask import Flask, render_template, request, jsonify
import base64
import numpy as np
import cv2
import tensorflow as tf
import os

app = Flask(__name__)

# =========================
# LOAD TEACHABLE MACHINE MODEL
# =========================
model = tf.keras.layers.TFSMLayer(
    "model.savedmodel",
    call_endpoint="serving_default"
)

# =========================
# LOAD LABELS
# =========================
with open("labels.txt", "r") as f:
    labels = [line.strip() for line in f.readlines()]

# =========================
# ROUTES
# =========================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/gesture")
def gesture():
    return render_template("gesture_to_text.html")


@app.route("/text")
def text_to_gesture():
    return render_template("text_to_gesture.html")


@app.route("/learn")
def learn():
    return render_template("learn.html")


@app.route("/emergency")
def emergency():
    return render_template("emergency.html")


# =========================
# PREDICT API (REAL TIME AI)
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Decode base64 image
        img_data = data["image"].split(",")[1]
        img_bytes = base64.b64decode(img_data)

        # Convert to image
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Preprocess image
        img = cv2.resize(img, (224, 224))
        img = img.astype(np.float32)
        img = (img / 127.5) - 1
        img = np.expand_dims(img, axis=0)

        # Prediction
        prediction = model(img)

        # Extract output tensor
        prediction = list(prediction.values())[0].numpy()

        index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        label = labels[index] if index < len(labels) else "Unknown"

        return jsonify({
            "prediction": label,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({
            "prediction": "error",
            "confidence": 0,
            "error": str(e)
        })


# =========================
# RUN APP
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
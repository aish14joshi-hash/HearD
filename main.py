import numpy as np
from keras.models import load_model
from PIL import Image

# LOAD MODEL
model = load_model("keras_model.h5", compile=False)

# LOAD LABELS
class_names = open("labels.txt", "r").readlines()


def predict_image(image_path):

    image = Image.open(image_path).convert("RGB")
    image = image.resize((224, 224))

    image = np.asarray(image, dtype=np.float32)

    image = (image / 127.5) - 1

    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image, verbose=0)

    index = np.argmax(prediction)

    class_name = class_names[index].strip()

    confidence = float(prediction[0][index])

    return class_name, confidence

import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 7000 or img.height > 7000:
                raise ValidationError("The max dimensions are 70x70.")


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpeg", ".jpg", ".png", ".gif", ".svg"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension")

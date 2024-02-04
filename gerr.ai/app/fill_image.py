from PIL import Image
import numpy as np
import cv2
import matplotlib.pyplot as plt

FILL = [128, 128, 128]

def get_filled_img(filename):
    image = Image.open(filename)
    image_arr = np.array(image)

    img_colors = 255 * np.ones(image_arr[:, :, :3].shape)
    alphas = image_arr[:, :, 3]
    img_colors[alphas.nonzero()] = [0, 0, 0]

    for i in range(img_colors.shape[0]):
        img_colors[i, 0] = [0, 0, 0]
        img_colors[i, -1] = [0, 0, 0]
    for i in range(img_colors.shape[1]):
        img_colors[0, i] = [0, 0, 0]
        img_colors[-1, i] = [0, 0, 0]

    filled_img = img_colors.copy().astype('int32')
    cv2.floodFill(filled_img, None, (img_colors.shape[1]//2, img_colors.shape[0]//2), FILL)

    filled_img[filled_img != 128] = 255

    return filled_img




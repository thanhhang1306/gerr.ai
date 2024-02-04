from fill_image import get_filled_img
from compactness_scores import *
from gpt_response import get_response
import matplotlib.pyplot as plt

filename = "sample_drawing.png"
filled_img = get_filled_img(filename)
plt.imshow(filled_img)
plt.show()

scores = {'area': area(filled_img),
          'perimeter': perimeter(filled_img),
          'pp': polsby_popper(filled_img),
          'schwartz': schwartzberg(filled_img),
          'reock': reock(filled_img),
          'convex': convex_hull(filled_img),
          'lw': length_width(filled_img)}
print(scores)

response = get_response(scores)
print(response)
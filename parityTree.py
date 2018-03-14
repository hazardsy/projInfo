import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

input = np.arange(1000)
input = input.reshape(-1,1)
output = ["pair" if x%2 else "impair" for x in input]

input_training, input_test, output_training, output_test = train_test_split(input,output)

tree=DecisionTreeClassifier(max_depth = 125)
tree.fit(input_training, output_training)

predictions = tree.predict(input_test)
print(accuracy_score(output_test, predictions))

#Import tools needed for visualization
from sklearn.tree import export_graphviz
import pydot
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
import sys

# Export the image to a dot file
export_graphviz(tree, out_file = 'paritytree.dot', feature_names = ["nombre"], rounded = True, precision = 1)
# Use dot file to create a graph
(graph, ) = pydot.graph_from_dot_file('paritytree.dot')
# Write graph to a png file
graph.write_png('paritytree.png')


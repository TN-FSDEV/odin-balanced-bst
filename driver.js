import { Tree } from "./balanced-bst.js";

const arr = generateRandomArray();
console.log("Random array:", arr);

const tree = new Tree(arr);
prettyPrint(tree.root);

console.log("Is tree balanced? ", tree.isBalanced);
printTraversals(tree);

// Unbalance the tree by inserting large numbers > 100
const largeNumbers = [101, 150, 200, 300, 400];
largeNumbers.forEach(num => tree.insert(num));

console.log();
console.log("After adding large numbers:", largeNumbers.join(", "));
console.log("Is tree balanced after unbalancing? ", tree.isBalanced);
prettyPrint(tree.root);

// Rebalance the tree
tree.rebalance();
prettyPrint(tree.root);
console.log("Is tree balanced after rebalancing? ", tree.isBalanced);
printTraversals(tree);


function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

// Helper function to generate random numbers < 100
function generateRandomArray(size = 15) {
    const arr = [];
    while (arr.length < size) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

// Print traversals function
function printTraversals(tree) {
    let values = [];

    values = [];
    tree.levelOrder((node) => values.push(node.value));
    console.log("Level order:", values.join(" "));

    values = [];
    tree.preOrder((node) => values.push(node.value));
    console.log("Pre order:", values.join(" "));

    values = [];
    tree.inOrder((node) => values.push(node.value));
    console.log("In order:", values.join(" "));

    values = [];
    tree.postOrder((node) => values.push(node.value));
    console.log("Post order:", values.join(" "));
}
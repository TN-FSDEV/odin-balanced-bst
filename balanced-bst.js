class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.#buildTree(sortedArray);
    }

    #buildTree(arr) {
        function buildTreeRecur(arr, start, end) {
            if (start > end) return null;

            let mid = Math.floor((start + end) / 2);
            let root = new Node(arr[mid]);

            root.left = buildTreeRecur(arr, start, mid - 1);
            root.right = buildTreeRecur(arr, mid + 1, end);

            return root;
        }
        return buildTreeRecur(arr, 0, arr.length - 1);
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);
        if (root.value === value) return root;

        if (value < root.value) {
            root.left = this.insert(value, root.left);
        } else if (value > root.value) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    delete(value, root = this.root) {
        if (root === null) return null;

        if (value < root.value) {
            root.left = this.delete(value, root.left);
        } else if (value > root.value) {
            root.right = this.delete(value, root.right);
        } else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            let nextValue = root.right;
            while (nextValue.left !== null) {
                nextValue = nextValue.left;
            }
            root.value = nextValue.value;
            root.right = this.delete(nextValue.value, root.right);
        }
        return root;
    }

    find(value, root = this.root) {
        if (root === null) return null;

        if (value === root.value) return root;
        if (value < root.value) return this.find(value, root.left);
        return this.find(value, root.right);
    }

    levelOrder(callback) {
        try {
            if (!callback || typeof callback !== "function")
                throw new Error("a callback is required!");
            const queue = [];
            if (this.root !== null) queue.push(this.root);

            while (queue.length > 0) {
                const current = queue.shift();
                callback(current);
                if (current.left !== null) queue.push(current.left);
                if (current.right !== null) queue.push(current.right);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    inOrder(callback, node = this.root) {
        try {
            if (!callback || typeof callback !== "function")
                throw new Error("a callback is required!");
            if (node === null) return;

            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);

        } catch (err) {
            console.log(err.message);
        }
    }

    preOrder(callback, node = this.root) {
        try {
            if (!callback || typeof callback !== "function")
                throw new Error("a callback is required!");
            if (node === null) return;

            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);

        } catch (err) {
            console.log(err.message);
        }
    }

    postOrder(callback, node = this.root) {
        try {
            if (!callback || typeof callback !== "function")
                throw new Error("a callback is required!");
            if (node === null) return;

            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);

        } catch (err) {
            console.log(err.message);
        }
    }

    height(value) {
        const foundNode = this.find(value);
        if (!foundNode) return null;

        function getHeight(node) {
            if (node === null) return -1;
            return 1 + Math.max(getHeight(node.left), getHeight(node.right));
        }

        return getHeight(foundNode);
    }

    depth(value, root = this.root) {
        if (root === null) return null;
        if (value === root.value) return 0;

        if (value < root.value) {
            const leftDepth = this.depth(value, root.left);
            return leftDepth !== null ? 1 + leftDepth : null;
        } else {
            const rightDepth = this.depth(value, root.right);
            return rightDepth !== null ? 1 + rightDepth : null;
        }
    }

    get isBalanced() {
        //if pass, check -> height for bubble new check
        const checkBalance = (node) => {
            if (node === null) return 0;

            const left = checkBalance(node.left);
            if (left === -1) return -1;

            const right = checkBalance(node.right);
            if (right === -1) return -1;

            if (Math.abs(left - right) > 1) return -1;

            return 1 + Math.max(left, right);
        };

        return checkBalance(this.root) !== -1;
    }

    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.value));
        this.root = this.#buildTree(values);
    }
}

export { Tree };
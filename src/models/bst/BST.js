class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    add(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return true;
        } else {
            return this.insertNode(this.root, value);
        }
    }

    insertNode(node, value) {
        if (value.date >= node.value.date) {
            if (node.right === null) {
                node.right = new Node(value);
                return true;
            } else {
                return this.insertNode(node.right, value);
            }
        } else {
            if (node.left === null) {
                node.left = new Node(value);
                return true;
            } else {
                return this.insertNode(node.left, value);
            }
        }
    }

    search(date) {
        return this.searchNode(this.root, date);
    }

    searchNode(node, date) {
        if (node === null) {
            return [];
        }
        if (date === node.value.date) {
            return [node.value];
        } else if (date < node.value.date) {
            return this.searchNode(node.left, date);
        } else {
            return this.searchNode(node.right, date);
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    findMaxNode(node) {
        if (node.right === null) {
            return node;
        } else {
            return this.findMaxNode(node.right);
        }
    }

    inOrderTraversal(node, callback) {
        if (node !== null) {
            this.inOrderTraversal(node.left, callback);
            callback(node.value);
            this.inOrderTraversal(node.right, callback);
        }
    }

    getMin() {
        if (this.root === null) {
            return null;
        } else {
            return this.findMinNode(this.root).value;
        }
    }

    getMax() {
        if (this.root === null) {
            return null;
        } else {
            return this.findMaxNode(this.root).value;
        }
    }

    printAll(callback) {
        this.inOrderTraversal(this.root, callback);
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value.date < node.value.date) {
            node.left = this.deleteNode(node.left, value);
        } else if (value.date > node.value.date) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node to delete found
            if (node.left === null && node.right === null) {
                // Node has no children
                node = null;
            } else if (node.left === null) {
                // Node has one child (right)
                node = node.right;
            } else if (node.right === null) {
                // Node has one child (left)
                node = node.left;
            } else {
                // Node has two children
                const minRight = this.findMinNode(node.right);
                node.value = minRight.value;
                node.right = this.deleteNode(node.right, minRight.value);
            }
        }

        return node;
    }
}

export default BST;

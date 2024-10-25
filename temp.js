var Color = {
    RED: 'RED',
    BLACK: 'BLACK'
};
console.log('a');
var TreeNode = /** @class */ (function () {
    function TreeNode(key, data, color) {
        if (key === void 0) { key = null; }
        if (data === void 0) { data = null; }
        if (color === void 0) { color = Color.RED; }
        this.key = key;
        this.data = data;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
    TreeNode.prototype.isRed = function () {
        return this.color === Color.RED;
    };
    TreeNode.prototype.isBlack = function () {
        return this.color === Color.BLACK;
    };
    TreeNode.prototype.setBlack = function () {
        this.color = Color.BLACK;
    };
    TreeNode.prototype.setRed = function () {
        this.color = Color.RED;
    };
    return TreeNode;
}());
var RedBlackTree = /** @class */ (function () {
    function RedBlackTree() {
        this.NIL = new TreeNode(null, null, Color.BLACK);
        this.root = this.NIL;
    }
    RedBlackTree.prototype.insert = function (key, data) {
        var newNode = new TreeNode(key, data);
        newNode.left = newNode.right = this.NIL;
        var _a = this.traverseTree(key), parentNode = _a.parentNode, currentNode = _a.currentNode;
        newNode.parent = parentNode;
        if (!parentNode) {
            this.root = newNode;
        }
        else {
            this.assignParentSide(newNode, parentNode, key);
        }
        this.fixInsert(newNode);
    };
    RedBlackTree.prototype.traverseTree = function (key) {
        var currentNode = this.root;
        var parentNode = null;
        while (currentNode !== this.NIL) {
            parentNode = currentNode;
            currentNode = key < currentNode.key ? currentNode.left : currentNode.right;
        }
        return { parentNode: parentNode, currentNode: currentNode };
    };
    RedBlackTree.prototype.assignParentSide = function (newNode, parentNode, key) {
        if (key < parentNode.key) {
            parentNode.left = newNode;
        }
        else {
            parentNode.right = newNode;
        }
    };
    RedBlackTree.prototype.fixInsert = function (node) {
        var _a, _b;
        while ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.isRed()) {
            var isParentLeftChild = node.parent === ((_b = node.parent.parent) === null || _b === void 0 ? void 0 : _b.left);
            this.fixInsertForSide(node, isParentLeftChild ? 'left' : 'right');
        }
        this.root.setBlack();
    };
    RedBlackTree.prototype.fixInsertForSide = function (node, side) {
        var _a, _b;
        var uncle = side === 'left' ? (_a = node.parent.parent) === null || _a === void 0 ? void 0 : _a.right : (_b = node.parent.parent) === null || _b === void 0 ? void 0 : _b.left;
        if (uncle === null || uncle === void 0 ? void 0 : uncle.isRed()) {
            this.recolor(node, uncle);
        }
        else {
            this.handleRotation(node, side);
        }
    };
    RedBlackTree.prototype.recolor = function (node, uncle) {
        node.parent.setBlack();
        uncle.setBlack();
        node.parent.parent.setRed();
        node = node.parent.parent;
    };
    RedBlackTree.prototype.handleRotation = function (node, side) {
        var isNodeRightChild = side === 'left' ? node === node.parent.right : node === node.parent.left;
        if (isNodeRightChild) {
            node = node.parent;
            side === 'left' ? this.rotateLeft(node) : this.rotateRight(node);
        }
        node.parent.setBlack();
        node.parent.parent.setRed();
        side === 'left' ? this.rotateRight(node.parent.parent) : this.rotateLeft(node.parent.parent);
    };
    RedBlackTree.prototype.rotateLeft = function (node) {
        var rightChild = node.right;
        node.right = rightChild.left;
        if (rightChild.left !== this.NIL) {
            rightChild.left.parent = node;
        }
        this.transplantNode(node, rightChild);
        rightChild.left = node;
        node.parent = rightChild;
    };
    RedBlackTree.prototype.rotateRight = function (node) {
        var leftChild = node.left;
        node.left = leftChild.right;
        if (leftChild.right !== this.NIL) {
            leftChild.right.parent = node;
        }
        this.transplantNode(node, leftChild);
        leftChild.right = node;
        node.parent = leftChild;
    };
    RedBlackTree.prototype.transplantNode = function (oldNode, newNode) {
        if (!oldNode.parent) {
            this.root = newNode;
        }
        else if (oldNode === oldNode.parent.left) {
            oldNode.parent.left = newNode;
        }
        else {
            oldNode.parent.right = newNode;
        }
        newNode.parent = oldNode.parent;
    };
    RedBlackTree.prototype.search = function (key) {
        var currentNode = this.root;
        while (currentNode !== this.NIL && key !== currentNode.key) {
            currentNode = key < currentNode.key ? currentNode.left : currentNode.right;
        }
        return currentNode === this.NIL ? null : currentNode;
    };
    RedBlackTree.prototype.update = function (key, newData) {
        var node = this.search(key);
        if (node) {
            node.data = newData;
        }
    };
    RedBlackTree.prototype.delete = function (key) {
        var nodeToDelete = this.search(key);
        if (!nodeToDelete)
            return;
        var nodeToReplace = nodeToDelete;
        var originalColor = nodeToReplace.color;
        var replacementNode;
        if (nodeToDelete.left === this.NIL) {
            replacementNode = nodeToDelete.right;
            this.transplantNode(nodeToDelete, nodeToDelete.right);
        }
        else if (nodeToDelete.right === this.NIL) {
            replacementNode = nodeToDelete.left;
            this.transplantNode(nodeToDelete, nodeToDelete.left);
        }
        else {
            nodeToReplace = this.findMinimum(nodeToDelete.right);
            originalColor = nodeToReplace.color;
            replacementNode = nodeToReplace.right;
            if (nodeToReplace.parent === nodeToDelete) {
                replacementNode.parent = nodeToReplace;
            }
            else {
                this.transplantNode(nodeToReplace, nodeToReplace.right);
                nodeToReplace.right = nodeToDelete.right;
                nodeToReplace.right.parent = nodeToReplace;
            }
            this.transplantNode(nodeToDelete, nodeToReplace);
            nodeToReplace.left = nodeToDelete.left;
            nodeToReplace.left.parent = nodeToReplace;
            nodeToReplace.color = nodeToDelete.color;
        }
        if (originalColor === Color.BLACK) {
            this.fixDelete(replacementNode);
        }
    };
    RedBlackTree.prototype.fixDelete = function (node) {
        while (node !== this.root && node.isBlack()) {
            var isNodeLeftChild = node === node.parent.left;
            this.fixDeleteForSide(node, isNodeLeftChild ? 'left' : 'right');
        }
        node.setBlack();
    };
    RedBlackTree.prototype.fixDeleteForSide = function (node, side) {
        var sibling = side === 'left' ? node.parent.right : node.parent.left;
        if (sibling.isRed()) {
            sibling.setBlack();
            node.parent.setRed();
            side === 'left' ? this.rotateLeft(node.parent) : this.rotateRight(node.parent);
            sibling = side === 'left' ? node.parent.right : node.parent.left;
        }
        if (sibling.left.isBlack() && sibling.right.isBlack()) {
            sibling.setRed();
            node = node.parent;
        }
        else {
            if ((side === 'left' ? sibling.right : sibling.left).isBlack()) {
                ;
                (side === 'left' ? sibling.left : sibling.right).setBlack();
                sibling.setRed();
                side === 'left' ? this.rotateRight(sibling) : this.rotateLeft(sibling);
                sibling = side === 'left' ? node.parent.right : node.parent.left;
            }
            sibling.color = node.parent.color;
            node.parent.setBlack();
            (side === 'left' ? sibling.right : sibling.left).setBlack();
            side === 'left' ? this.rotateLeft(node.parent) : this.rotateRight(node.parent);
            node = this.root;
        }
    };
    RedBlackTree.prototype.findMinimum = function (node) {
        while (node.left !== this.NIL) {
            node = node.left;
        }
        return node;
    };
    return RedBlackTree;
}());
console.log('a');

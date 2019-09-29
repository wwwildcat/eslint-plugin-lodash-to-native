//  Код функции-обертки с проверкой 
function wrapperFunctionText () {
	return `//Функция-обертка, заменяющая _.map на Array#map, если это возможно
	function lodashToNativeMap(collection, fn) {
		if (Array.isArray(collection)) {
			return collection.map(fn);
		}
		else {
			return _.map(collection, fn);
		}
	}
	
	`;
}

module.exports = {
	'map': {
		meta: {
			type: 'suggestion',
			docs: {
				description: 'Replace Lodash _.map with native Array#map',
				category: 'Best Practices',
			},
			fixable: 'code',
		},
		create: context => {
			return {
				'CallExpression[callee.type="MemberExpression"]': node => {
					let replace = true;
					context.getAncestors().forEach(node => { // Проверка, что узел не является потомком функции-обертки (в этом случае предупреждать, естественно, не нужно)
						if (node.type === 'FunctionDeclaration' && node.id.name === 'lodashToNativeMap') {
							replace = false;
						}
					});
					// Проверка, что вызывается именно _.map, и ее первый аргумент не является литералом объекта
					if (replace && node.callee.object.name === '_' && node.callee.property.name === 'map' && node.arguments[0].type !== 'ObjectExpression') {
						context.report({
							node: node,
							message: 'Lodash _.map can be replaced with native Array#map',
							fix: function(fixer) {
								const sourceCode = context.getSourceCode();
								const collection = node.arguments[0];
								const collectionText = sourceCode.getText(collection);
								const fnText = sourceCode.getText(node.arguments[1]);
								if (collection.type === 'ArrayExpression') { // Если первый аргумент _.map - литерал массива, то проверка на массив не нужна
									const resultingText = collectionText + '.map(' + fnText + ')';
									return fixer.replaceText(node, resultingText);
								}
								else {
									const allCode = sourceCode.getText();
									const resultingText = `lodashToNativeMap(${collectionText}, ${fnText})`;
									if (allCode.indexOf(wrapperFunctionText()) === -1) { // Проверка, объявлена ли уже функция-обертка
										const root = context.getAncestors()[0];
										const comments = sourceCode.getCommentsBefore(root);
										if (comments.length) { // Проверка наличия комментариев перед корневым узлом
											return [fixer.insertTextBefore(comments[0], wrapperFunctionText()), fixer.replaceText(node, resultingText)];
										}
										return [fixer.insertTextBefore(root, wrapperFunctionText()), fixer.replaceText(node, resultingText)];
									}
									return fixer.replaceText(node, resultingText);
								}
							} 
						});
					}
				}
			};
		}
	}
};
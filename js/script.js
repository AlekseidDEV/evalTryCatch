const filterByType = (type, ...values) => values.filter((value) => typeof value === type) // здесь фильтруются данные из массива values, и сравниваются с типом, если есть совпадения, то вернется количетсво этих совпадений, если нет, то просто 0
	hideAllResponseBlocks = () => {
		const responseBlocksArray = document.querySelectorAll('div.dialog__response-block'); // изначально тут была запись Array.from, но я ее затер, ибо вызывая querySelectorAll, мы все равно получим массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебираем полученные блоки, и скрываем их
	},


	showResponseBlock = (blockSelector, msgText, spanSelector) => { // запускаем функцию, и принемаем параметры
		hideAllResponseBlocks(); // запуск функции , которая проверяет наличие блоков с ответом , и затирает их (display none)
	document.querySelector(blockSelector).style.display = 'block'; // находим элемент по данным из параметра и открываем его
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; // я так понимаю, для начала мы провиряем наличие данных в параметре, если они есть, то тогда по этим данным находим элемент, и в его текст контент записываем мэсседж
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // опять вызываем showResults и передаем туда все те же данные, только теперь данные связанные с ошибкой

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // вызываем функцию showResults, и внутри нее вызываем функцию showResponseBlock, передавая 2 параметра (класс и айдишник) элементов, и передаем сообщение

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // вызываем функцию showNoResults, и внутри нее вызываем функцию showResponseBlock, передавая параметр(класс элемента)

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(', ') // запускаем функцию фильтрации, передавая туда тип данных, и сами данные (данные обрабатываем методом join, по запятой)
			console.log(valuesArray.length);
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` : // тернарный оператор, который проверяет, если длинна массива не равна нулю, то в переменную занесется одно значение, если равно нулю, то другое значение (мэсседж в данном случае)
				`Отсутствуют данные типа ${type}`
			showResults(alertMsg); // запускаем функцию showResults и передаем ей значение (мессэдж)
		 } catch (e) {
			showError(`Ошибка: ${e}`); // отлавливаем ошибки, если есть ошибка, то запускаем функцию, передаем туда текст с содержимым ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // находим кнопку в верстке

filterButton.addEventListener('click', e => { // обработчик события на кнопку
	const typeInput = document.querySelector('#type'); // находим селект с типом данных
	const dataInput = document.querySelector('#data'); // находим инпут, куда будем вводить текст

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // если инпут пустой, то у инпута будет подсвечиваться поле с предупрежденим
		showNoResults(); // запускаем функцию если результата нет (пустой инпут)
	} else {
		dataInput.setCustomValidity(""); // убираем поле с предупреждением
		e.preventDefault(); // убираем стандартное поведение у кнопки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // запускаем функцию фильтрации, и передаем туда значение селекта и инпута
	}
});


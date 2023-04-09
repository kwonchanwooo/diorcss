const btnOpen = document.querySelector('.btnOpen');
const main = document.querySelector('main');
const aside = document.querySelector('aside');

const _top = aside.querySelector('.top');
const _right = aside.querySelector('.right');
const _bottom = aside.querySelector('.bottom');
const _left = aside.querySelector('.left');
const _inner = aside.querySelector('.inner');

const btnClose = document.querySelector('.btnClose');

let speed = 500;
//console.log(window);

/*
윈도우 객체는 브라우저 탭에서 존재하는 자바스크립트 전역최상위 객체입니다
따라서 윈도우 객체를 통해서면 어디든 접근이 가능하다

윈도우 안에 document가 존재, 그 안에서 잠재적으로 보여질 수 있는 DOM에 대한 정보가 저장되는것
BOM 브라우저의 잠재적인 정보

윈도우는 최상위 객체로 전역으로 선언되기 때문에 안에있는 요소를 쓸때 윈도우를 생략가능하지만 SCOPE 의 문제가 있어서 윈도우를 써줘야한다

특정 이벤트 LOAD, RESIZE, SCROLL은 윈도우 객체에서만 접근이 가능하다


콜백함수??

함수에 매개변수 자리에 들어가는 함수

비동기방식 처리의 1단계가 콜백함수 - 코드가 길어지고 가독성이 떨어지는 단점
2단계 promise
3단계 async await

콜백함수는 비동기화를 위해 사용하고
자바스크립트는 호이스팅이라는 현상때문에 함수들이 모두 위로 끌어져 올라가져서 순차적이지 못하다


비동기화와 동기화??
비동기는 개발자가 과정에 개입해서 정확하게 순서를 지정할수 있다
호이스팅 현상때문에 순차적이지 못한 자바스크립를 정확한 순차에 맞춰야 할경우 사용한다

*/
btnOpen.addEventListener('click', (e) => {
	e.preventDefault();
	aside.style.display = 'block';
	main.classList.add('off');

	//사라짐과 동시에 선이 그어지고 선이 다 그어진 뒤에 inner가 등장해야한다
	//순서가 중요하다

	new Anim(_top, {
		prop: 'width',
		value: '100%',
		duration: speed,
		callback: () => {
			new Anim(_right, {
				prop: 'height',
				value: '100%',
				duration: speed,
				callback: () => {
					new Anim(_bottom, {
						prop: 'width',
						value: '100%',
						duration: speed,
						callback: () => {
							new Anim(_left, {
								prop: 'height',
								value: '100%',
								duration: speed,
								callback: () => {
									new Anim(_inner, {
										prop: 'opacity',
										value: 1,
										duration: speed,
									});
								},
							});
						},
					});
				},
			});
		},
	});
});

btnClose.addEventListener('click', (e) => {
	e.preventDefault();

	new Anim(_inner, {
		prop: 'opacity',
		value: 0,
		duration: speed,
		callback: () => {
			new Anim(_top, {
				prop: 'width',
				value: '0%',
				duration: speed,
			});
			new Anim(_right, {
				prop: 'height',
				value: '0%',
				duration: speed,
			});
			new Anim(_bottom, {
				prop: 'width',
				value: '0%',
				duration: speed,
			});
			new Anim(_left, {
				prop: 'height',
				value: '0%',
				duration: speed,
				callback: () => {
					aside.style.display = 'none';
					main.classList.remove('off');
				},
			});
		},
	});
});

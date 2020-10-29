window.addEventListener('DOMContentLoaded', () => {
    let timerDeadlines = {
        deadline1: new Date('2020-11-17T15:05'),
        deadline2: new Date('2020-12-17T21:32'),
        deadline3: new Date('2021-01-01T00:00'),
    }
    ibg();
    initBurgerMenu();
    placeholderInputs();
    simpleSlider();
    burgerMenu();
    addActiveClass();
    changeHeightLotsItem();
    timer({
        deadline: timerDeadlines.deadline1,
        timerSelector: '#watch'
    });
    timer({
        deadline: timerDeadlines.deadline2,
        timerSelector: '#wine'
    });
    timer({
        deadline: timerDeadlines.deadline3,
        timerSelector: '#watch2'
    });
    window.addEventListener('resize', initBurgerMenu)
    slider({
        sliderSelector: '.slider',
        sliderArrowLeft: '.slider_arrows img:nth-child(1)',
        sliderArrowRight: '.slider_arrows img:nth-child(3)',
        dots: false,
        scrollByMouse: false,
        dragByMouse: false,
        scrollByTouch: true,
        dragByTouch: true,
        transitionDuration: 1000,
        transitionProperty: 'ease-in-out',
        adaptiveHeight: false,
        autoPlay: false,
        autoPlayingInterval: 5000,
        waitForAnimation: false,
        arrows: true,
        slidesToShow: 1,
        swipeSlidesCount: 1
    });
    window.addEventListener('resize', changeHeightLotsItem)
    scrollTo({
        triggerSel: 'a[href="#trade"]'
    });
    scrollTo({
        triggerSel: 'a[href="#main"]'
    });
    scrollTo({
        triggerSel: 'a[href="#about"]'
    });
    scrollTo({
        triggerSel: 'a[href="#contacts"]'
    });
    if (window.matchMedia('(min-width: 715px)').matches) {
        changeHeightLotsItem();
        slider({
            sliderSelector: '.lots_slider',
            sliderArrowLeft: '.lots_arrows-left',
            sliderArrowRight: '.lots_arrows-right',
            scrollByTouch: true,
            dragByTouch: true,
            transitionDuration: 1000,
            transitionProperty: 'ease-in-out',
            arrows: true,
            slidesToShow: 3,
            swipeSlidesCount: 1
        });
    }
    if (window.matchMedia('(max-width: 830px)').matches) {
        changeHeightLotsItem();
        slider({
            sliderSelector: '.lots_slider',
            sliderArrowLeft: '.lots_arrows-left',
            sliderArrowRight: '.lots_arrows-right',
            scrollByTouch: true,
            dragByTouch: true,
            transitionDuration: 1000,
            transitionProperty: 'ease-in-out',
            arrows: true,
            slidesToShow: 2,
            swipeSlidesCount: 1
        });
    }
    if (window.matchMedia('(max-width: 510px)').matches) {
        changeHeightLotsItem();
        slider({
            sliderSelector: '.lots_slider',
            sliderArrowLeft: '.lots_arrows-left',
            sliderArrowRight: '.lots_arrows-right',
            scrollByTouch: true,
            dragByTouch: true,
            transitionDuration: 1000,
            transitionProperty: 'ease-in-out',
            arrows: true,
            slidesToShow: 1,
            swipeSlidesCount: 1
        });
    }


    function scrollTo({
        triggerSel,
        speed = 8,
        multiplySpeed = .095
    }) {
        let triggers = document.querySelectorAll(triggerSel);
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                let targetScrollTo = document.querySelector(trigger.hash);
                e.preventDefault();
                let targetOffset = targetScrollTo.offsetTop;

                let speedMulti = 0;
                let timer = setInterval(() => {
                    if (targetOffset > document.documentElement.scrollTop) {
                        document.documentElement.scrollTop += speed + speedMulti;
                        if (document.documentElement.scrollTop >= targetOffset ||
                            document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
                            clearInterval(timer);

                        }
                    } else {
                        document.documentElement.scrollTop -= speed + speedMulti;
                        if (document.documentElement.scrollTop <= targetOffset) {
                            clearInterval(timer);
                        }
                    }
                    speedMulti += multiplySpeed;
                }, 1)
            });
        });
    }

    function timer({
        deadline,
        timerSelector
    }) {
        let timer = document.querySelector(timerSelector);
        let days = timer.querySelector('#days');
        let hours = timer.querySelector('#hours');
        let minutes = timer.querySelector('#minutes');
        let seconds = timer.querySelector('#seconds');
        let timerID = setInterval(writeValueTimer, 1000);
        writeValueTimer();


        function writeValueTimer() {
            let r = calcRemainTime(deadline);
            days.textContent = setZero(r.days);
            hours.textContent = setZero(r.hours);
            minutes.textContent = setZero(r.minutes);
            seconds.textContent = setZero(r.seconds);
            if (r.mms <= 0) {
                clearInterval(timerID);
                days.textContent = setZero(0);
                hours.textContent = setZero(0);
                minutes.textContent = setZero(0);
                seconds.textContent = setZero(0);
            }
        }

        function calcRemainTime(endTime) {
            let mms = Date.parse(endTime) - Date.parse(new Date);
            let monthses = Math.floor(mms / (1000 * 60 * 60 * 24 * 7 * 4));
            let weeks = Math.floor(mms / (1000 * 60 * 60 * 24 * 7));
            let days = Math.floor(mms / (1000 * 60 * 60 * 24));
            let hours = Math.floor((mms / (1000 * 60 * 60)) % 24);
            let minutes = Math.floor((mms / (1000 * 60)) % 60);
            let seconds = Math.floor((mms / 1000) % 60);
            return {
                mms,
                monthses,
                weeks,
                days,
                hours,
                minutes,
                seconds
            }
        }

        function setZero(num) {
            if (num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    }

    function changeHeightLotsItem() {
        let lots = document.querySelectorAll('.lots_money-bot');
        let arr = [];
        lots.forEach(item => {
            let height = window.getComputedStyle(item).height.replace(/\D/g, '');
            arr.push(height);
        });
        let max = Math.max(...arr);
        lots.forEach(item => {
            item.style.height = `${max}px`;
        });
        arr = [];
    }

    function simpleSlider() {
        let wrapper = document.querySelector('.quotes_wrapper');

        let slides = document.querySelectorAll('.quotes_item');
        slides.forEach((item, i) => {
            item.style.display = 'none';
            if (i == 0) {
                item.style.display = 'flex';
            }
        });
        let currentSlide = 0;
        let trigger = document.querySelector('.quotes_arrows_img');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            slides.forEach(item => {
                item.classList.add('fadeOut');
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.remove('fadeOut');
                }, 500);
            });
            if (currentSlide != slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            setTimeout(() => {
                slides[currentSlide].style.display = 'flex';
                let height = window.getComputedStyle(slides[currentSlide]).height;
                console.log(height);
                wrapper.style.height = height;
            }, 500);
        });
    }

    function slider(obj) {
        let {
            sliderSelector,
            sliderArrowLeft,
            sliderArrowRight,
            slidesToShow,
            swipeSlidesCount,
            dots,
            scrollByMouse,
            scrollByTouch,
            dragByTouch,
            dragByMouse,
            transitionDuration,
            transitionProperty,
            adaptiveHeight,
            autoPlay,
            autoPlayingInterval,
            waitForAnimation,
            arrows
        } = obj;

        let slider = document.querySelector(sliderSelector);
        let inner = document.querySelector(`${sliderSelector}_inner`);
        let wrapper = document.querySelector(`${sliderSelector}_wrapper`);

        let slides = document.querySelectorAll(`${sliderSelector}_item`);
        let wrapperWidth = parseFloat(window.getComputedStyle(wrapper).width);
        let btnsWrapper = document.createElement('ul');
        btnsWrapper.classList.add('slider_btns');
        let slideWidth = wrapperWidth / slidesToShow;
        let translateInner = slideWidth * swipeSlidesCount;

        let arrowPrev;
        let arrowNext;
        let btns = [];
        let currentSlide = 0;
        let startPos;
        let endPos;
        let timer;
        let canClickToNextSlide = true;

        if (arrows) {
            arrowPrev = slider.querySelector(sliderArrowLeft);
            arrowNext = slider.querySelector(sliderArrowRight);
        }
        inner.style.width = slides.length * slideWidth + 'px';

        slides.forEach((item) => {
            item.style.flex = `0 0 ${slideWidth + 'px'}`;
        });

        // создаю кнопки слайдера
        if (dots) {
            for (let i = 0; i <= (slides.length - 1) / swipeSlidesCount; i++) {
                let btn = document.createElement('li');
                if (i == 0) {
                    btn.classList.add('active');
                }
                btn.classList.add('slider_btn');
                btnsWrapper.append(btn);
                btns.push(btn);
            }
        }

        if (adaptiveHeight) {
            let arr = [];
            for (let i = 0; i < slidesToShow; i++) {
                let height = window.getComputedStyle(slides[i]).height.replace(/\D/gi, '');
                arr.push(height);
            }
            let heightInner = Math.max(...arr);
            inner.style.height = +heightInner + 13 + 'px';
        }

        animationBtnOnEnd();
        activeBtnClass();
        if (dots) {
            slider.append(btnsWrapper);
            btns.forEach((item, i) => {
                item.addEventListener('click', function () {
                    if (canClickToNextSlide === false) {
                        return;
                    }
                    currentSlide = i;

                    animationBtnOnEnd();
                    activeBtnClass();
                    if (adaptiveHeight) {
                        adaptiveHeightSlider();
                    }
                    if (autoPlay) {
                        autoPlaying();
                    }
                    transitionsInner();
                });
            });
        }

        if (autoPlay) {
            autoPlaying();
            wrapper.addEventListener('mouseenter', () => {
                clearInterval(timer);
            });
            wrapper.addEventListener('mouseleave', () => {
                autoPlaying();
            });
        }

        if (arrows) {
            arrowPrev.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentSlide != 0) {
                    currentSlide--;
                }
                activeBtnClass();
                if (adaptiveHeight) {
                    adaptiveHeightSlider();
                }
                if (autoPlay) {
                    autoPlaying();
                }
                transitionsInner();
                animationBtnOnEnd();
            });
            arrowNext.addEventListener('click', (e) => {
                e.preventDefault();
                if (slides.length - 1 < swipeSlidesCount) {
                    return;
                }
                if (currentSlide < Math.round((slides.length - 1) / swipeSlidesCount)) {
                    currentSlide++;
                }
                activeBtnClass();
                if (adaptiveHeight) {
                    adaptiveHeightSlider();
                }
                if (autoPlay) {
                    autoPlaying();
                }
                transitionsInner();
                animationBtnOnEnd();
            });
        }


        wrapper.addEventListener('touchstart', (e) => {
            startPos = e.touches[0].pageX;
            clearInterval(timer);
        });
        wrapper.addEventListener('touchend', (e) => {
            if (slides.length - 1 < swipeSlidesCount) {
                return;
            }
            if (canClickToNextSlide === false) {
                return;
            }
            if (scrollByTouch) {
                endPos = e.changedTouches[0].pageX;
                if (endPos >= startPos + 150) {
                    if (currentSlide != Math.round((slides.length - 1) / swipeSlidesCount)) {
                        currentSlide++;
                    }
                } else if (endPos <= startPos - 150) {
                    if (currentSlide != 0) {
                        currentSlide--;
                    }
                }
            }
            activeBtnClass();
            if (adaptiveHeight) {
                adaptiveHeightSlider();
            }
            if (autoPlay) {
                autoPlaying();
            }
            transitionsInner();
            animationBtnOnEnd();
        });
        wrapper.addEventListener('touchmove', (e) => {
            if (canClickToNextSlide === false) {
                return;
            }
            if (dragByTouch) {
                let move = e.targetTouches[0].pageX - startPos;
                inner.style.transform = `translateX(-${currentSlide * translateInner + move + 'px'})`;
            }
        });

        wrapper.addEventListener('mousedown', (e) => {
            if (canClickToNextSlide === false) {
                return;
            }
            startPos = e.pageX;
            if (dragByMouse) {
                inner.addEventListener('mousemove', mouseMove);
            }
            clearInterval(timer);
        });
        wrapper.addEventListener('mouseup', (e) => {
            if (slides.length - 1 < swipeSlidesCount) {
                return;
            }
            if (canClickToNextSlide === false) {
                return;
            }
            if (scrollByMouse) {
                endPos = e.pageX;
                if (endPos >= startPos + 150) {
                    if (currentSlide != Math.round((slides.length - 1) / swipeSlidesCount)) {
                        currentSlide++;
                    }
                } else if (endPos <= startPos - 150) {
                    if (currentSlide != 0) {
                        currentSlide--;
                    }
                }
                activeBtnClass();
            }
            if (adaptiveHeight) {
                adaptiveHeightSlider();
            }
            if (autoPlay) {
                autoPlaying();
            }
            transitionsInner();
            animationBtnOnEnd();
            if (dragByMouse) {
                inner.removeEventListener('mousemove', mouseMove);
            }
        });


        function animationBtnOnEnd() {
            try {
                arrowPrev.classList.remove('nonActive');
                arrowNext.classList.remove('nonActive');
            } catch (e) {}
            if (currentSlide == 0) {
                try {
                    arrowPrev.classList.add('nonActive');
                } catch (e) {}
            }
            if (currentSlide == (slides.length - 1) / swipeSlidesCount) {
                arrowNext.classList.add('nonActive');
            }
        }

        function autoPlaying() {
            clearInterval(timer);
            timer = setTimeout(() => {
                if (currentSlide != (slides.length - 1) / swipeSlidesCount) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                activeBtnClass();
                transitionsInner();
                if (adaptiveHeight) {
                    adaptiveHeightSlider();
                }
                autoPlaying();
            }, autoPlayingInterval);
        }

        function mouseMove() {
            let move = e.pageX - startPos;
            inner.style.transform = `translateX(-${currentSlide * translateInner + move + 'px'})`;
        }

        function transitionsInner() {
            inner.style.transition = `${transitionDuration}ms all ${transitionProperty}`;
            inner.style.transform = `translateX(-${currentSlide * translateInner + 'px'})`;
            if (waitForAnimation) {
                canClickToNextSlide = false;
                setTimeout(() => {
                    canClickToNextSlide = true;
                }, transitionDuration);
            }
        }

        function adaptiveHeightSlider() {
            slides.forEach((slide, j) => {
                if (currentSlide == j) {
                    let heightSlide = window.getComputedStyle(slide).height;
                    inner.style.height = heightSlide;
                }
            })
        }

        function activeBtnClass() {
            btns.forEach((item, i) => {
                item.classList.remove('active');
                item.classList.remove('nonActive');
                if (i == currentSlide) {
                    item.classList.add('active');
                    if (currentSlide == 0 || currentSlide == (slides.length - 1) / swipeSlidesCount) {
                        item.classList.add('nonActive');
                    }
                }
            });
        }
    }

    function addActiveClass() {
        let triggerPerson = document.querySelector('.person');
        let person = document.querySelector('.persons_settings');
        triggerPerson.addEventListener('click', (e) => {
            e.preventDefault();
            person.classList.toggle('active');
        });
    }

    function initBurgerMenu() {
        let burger_page = document.querySelector('.burger_page');
        let headerMenu = document.querySelector('.header_menu_list');
        let chooseRegion = document.querySelector('.header_choose_a');
        let persons_settings_list = document.querySelector('.persons_settings_list');

        if (window.matchMedia('(max-width: 850px)').matches) {
            burger_page.append(headerMenu);
            persons_settings_list.append(chooseRegion);
        } else {
            document.querySelector('.header_choose').before(headerMenu);
            document.querySelector('.header_choose a').before(chooseRegion);
        }
    }

    function burgerMenu() {
        let burger_menu = document.querySelector('.burger_menu');
        let burger_page = document.querySelector('.burger_page');
        burger_menu.addEventListener('click', () => {
            burger_menu.classList.toggle('active');
            burger_page.classList.toggle('active');
            document.body.classList.toggle('lock');
        });
    }

    function placeholderInputs() {
        let input = document.querySelector('.form_input');
        let prevPlaceholder = input.placeholder;
        input.addEventListener('focus', () => {
            input.placeholder = '';
        });
        input.addEventListener('blur', () => {
            input.placeholder = prevPlaceholder;
        });
    }

    function ibg() {
        let ibg = document.querySelectorAll('.ibg');
        for (let i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img')) {
                ibg[i].style.backgroundImage = `url(${ibg[i].querySelector('img').getAttribute('src')})`;
            }
        }
    }
});
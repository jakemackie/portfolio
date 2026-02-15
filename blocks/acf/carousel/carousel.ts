import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

document.querySelectorAll<HTMLElement>('.js-carousel').forEach((el) => {
    const paginationEl = el.querySelector<HTMLElement>('.swiper-pagination')

    new Swiper(el, {
        modules: [Pagination],

        slidesPerView: 1,
        spaceBetween: 24,
        grabCursor: true,
        watchOverflow: true,

        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },

        pagination: {
            el: paginationEl ?? undefined,
            clickable: true,
        },
    })
})

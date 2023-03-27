const a=document.querySelector(".read__container");!function(s){const n=s.map((({id:a,cardFavText:s,mediaUrl:n,mediaAlt:e,newsCategory:r,title:t,subscribe:c,date:d,url:i})=>`\n        <div class="card" id=${a}>\n        <div class="card__img-wrapper">\n          <img class="card__img" src="${n}" alt="${e}"> \n          <span class="card__category">${r}</span>         \n          <div class="card__favorite">\n            <span class="card__favText">${s}</span>\n            <button class="card__favBtn" type="button" >\n              <svg class="card__favIcon" width="16" height="16" viewBox="0 0 32 32"> \n                <path class="card__heart" stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path> \n              </svg>\n            </button>\n          </div>\n        </div>\n        <h2 class="card__title">${t}</h2>\n        <p class="card__subscribe">${c}</p>\n        <span class="card__date">${d}</span>\n        <a href="${i}">\n          <span class="card__read-more">Read more</span>\n        </a>\n      </div>\n      `)).join("");a.insertAdjacentHTML("afterbegin",n)}(JSON.parse(localStorage.getItem("read")));
//# sourceMappingURL=read.d09cb474.js.map

!function(){var a,c=document.querySelector(".read__container"),n=JSON.parse(localStorage.getItem("read"));a=n.map((function(a){var c=a.id,n=a.cardFavText,t=a.mediaUrl,r=a.mediaAlt,s=a.newsCategory,e=a.title,d=a.subscribe,o=a.date,i=a.url;return'\n\n        <div class="accordion-item">\n     <div class="accordion-header">'.concat(o,'</div>\n     <div class="accordion-content"></div>\n     <div class="card" id=').concat(c,'>\n        <div class="card__img-wrapper">\n          <img class="card__img" src="').concat(t,'" alt="').concat(r,'"> \n          <span class="card__category">').concat(s,'</span>         \n          <div class="card__favorite">\n            <span class="card__favText">').concat(n,'</span>\n            <button class="card__favBtn" type="button" >\n              <svg class="card__favIcon" width="16" height="16" viewBox="0 0 32 32"> \n                <path class="card__heart" stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path> \n              </svg>\n            </button>\n          </div>\n        </div>\n        <h2 class="card__title">').concat(e,'</h2>\n        <p class="card__subscribe">').concat(d,'</p>\n        <span class="card__date">').concat(o,'</span>\n        <a href="').concat(i,'" target="_blank">\n          <span class="card__read-more">Read more</span>\n        </a>\n      </div>\n    </div>\n      ')})).join(""),c.insertAdjacentHTML("afterbegin",a);var t={};n.map((function(a){if(!t[a.date])return t[a.date]=[a];t[a.date].push(a)}));'\n    <div class="accordion-item">\n     <div class="accordion-header">'.concat(dataNow,'</div>\n     <div class="accordion-content">').concat(markup,"</div>\n    </div>")}();
//# sourceMappingURL=read.33725a5f.js.map

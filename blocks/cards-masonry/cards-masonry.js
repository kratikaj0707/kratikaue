// import { createOptimizedPicture } from "../../scripts/aem.js";
// function getFavorites(userId) {
//     const data = localStorage.getItem(`favorites_${userId}`);
//     return data ? JSON.parse(data) : [];
//   }
  
//   function saveFavorites(userId, favorites) {
//     localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
//   }
  
//   async function addFavorite(payload) {
//     const { userId, image } = payload;
//     const favorites = getFavorites(userId);
  
//     const alreadyExists = favorites.some((fav) => fav.image === image);
//     if (!alreadyExists) {
//       favorites.push(payload);
//       saveFavorites(userId, favorites);
//     }
//   }
  
//   async function removeFavorite(userId, image) {
//     let favorites = getFavorites(userId);
//     favorites = favorites.filter((fav) => fav.image !== image);
//     saveFavorites(userId, favorites);
//   }
//   export default async function decorate(block) {
//     const ul = document.createElement("ul");
//     const cardsBlock = block;
//     const userId = localStorage.getItem("userId");

//       const renderFromFavorites = cardsBlock.classList.contains("dynamic");
  
//       // Use localStorage instead of API
//       let userFavorites = [];
//       if (userId && renderFromFavorites) {
//         userFavorites = getFavorites(userId);
//       }
  
//       const rows = renderFromFavorites
//         ? userFavorites.map((fav) => {
//             const li = document.createElement("li");
//             li.style.position = "relative";
  
//             const imgDiv = document.createElement("div");
//             imgDiv.className = "cards-card-image";
//             const pic = createOptimizedPicture(
//               fav.image,
//               fav.title || "",
//               false,
//               [{ width: "750" }],
//             );
//             imgDiv.appendChild(pic);
  
//             const bodyDiv = document.createElement("div");
//             bodyDiv.className = "cards-card-body";
//             const h4 = document.createElement("h4");
//             h4.textContent = fav.title || "";
//             const p = document.createElement("p");
//             p.textContent = fav.description || "";
//             const tagList = document.createElement("ul");
//             (fav.tags || []).forEach((tag) => {
//               const tagLi = document.createElement("li");
//               tagLi.textContent = tag;
//               tagList.appendChild(tagLi);
//             });
//             bodyDiv.appendChild(tagList);
//             bodyDiv.appendChild(h4);
//             bodyDiv.appendChild(p);
  
//             li.appendChild(imgDiv);
//             li.appendChild(bodyDiv);
//             return li;
//           })
//         : [...block.children].map((row) => {
            
//             const li = document.createElement("li");
//             while (row.firstElementChild) li.append(row.firstElementChild);
//             [...li.children].forEach((div) => {
//                 if (div.children.length === 1 && div.querySelector("picture")) {
//                   div.className = "cards-card-image";
//                 } else {
//                   div.className = "cards-card-body";
              
//                   // Combine all <ul>s into one
//                   const allLists = div.querySelectorAll("ul");
//                   if (allLists.length > 1) {
//                     const combinedList = document.createElement("ul");
              
//                     allLists.forEach((ul) => {
//                       ul.querySelectorAll("li").forEach((item) => {
//                         combinedList.appendChild(item.cloneNode(true));
//                       });
//                     });
              
//                     // Remove old lists
//                     allLists.forEach((ul) => ul.remove());
              
//                     // Add new combined list
//                     div.prepend(combinedList);
//                   }
//                 }
//               });
              
         
//             return li;
//           });
  
//       rows.forEach((li) => {
//         const imageSrc = li.querySelector("picture img")?.src || "";
//         let isFavorite = userFavorites.some((fav) => fav.image === imageSrc);
  
//         const heartIcon = document.createElement("div");
//         heartIcon.className = "favorite-icon";
//         if (isFavorite) heartIcon.classList.add("is-favorite");
  
//         li.style.position = "relative";
//         li.appendChild(heartIcon);
  
//         heartIcon.addEventListener("click", async (e) => {
//           e.stopPropagation();
  
//           if (!userId) {
//             alert("Please log in to save favorites.");
//             return;
//           }
  
//           const card = e.target.closest("li");
//           const image = card.querySelector("picture img")?.src || "";
//           const tags = Array.from(
//             card.querySelectorAll(".cards-card-body ul li"),
//           ).map((list) => list.textContent.trim());
//           const title = card.querySelector("h4")?.textContent.trim() || "";
//           const description = card.querySelector("p")?.textContent.trim() || "";
//           const payload = {
//             userId,
//             image,
//             tags,
//             title,
//             description,
//           };
  
//           try {
//             if (isFavorite) {
//               await removeFavorite(userId, image); // localStorage version
//               heartIcon.classList.remove("is-favorite");
//               isFavorite = false;
//               if (renderFromFavorites) {
//                 li.remove();
//               }
//             } else {
//               await addFavorite(payload); // localStorage version
//               heartIcon.classList.add("is-favorite");
//               isFavorite = true;
//             }
//           } catch (err) {
//             alert("Something went wrong. Please try again.");
//           }
//         });
  
//         ul.appendChild(li);
//       });
  
//       ul.querySelectorAll("picture > img").forEach((img) => {
//         const picture = img.closest("picture");
//         if (picture) {
//           picture.replaceWith(
//             createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }]),
//           );
//         }
//       });
  
//       block.textContent = "";
//       block.appendChild(ul);
    
//   }
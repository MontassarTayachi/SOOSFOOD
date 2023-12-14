// menuFetch.js

let MenuList = [];

async function fetchMenuList() {
  try {
    const response = await fetch("http://localhost:4000/select/plat/");
    MenuList = await response.json();
    MenuList = MenuList.map(item => ({
      ...item,
      image: item.image.trim().replace(/^null/, '')
    }));
  } catch (err) {
    console.error("Error fetching menu list:", err);
    MenuList = []; // Set a default value (empty array) in case of an error
  }
  return MenuList;
}

export { MenuList, fetchMenuList };

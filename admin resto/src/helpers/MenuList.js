let menuList = null;

try {
  const response = await fetch("/select/plat/3");
  menuList = await response.json();

  // Clean up the "image" property in each item
  menuList = menuList.map(item => ({
    ...item,
    image: item.image.trim().replace(/^null/, '')
  }));
} catch (err) {
  console.error(err.message);
  menuList = []; // Set a default value (empty array) in case of an error
}

export default menuList;

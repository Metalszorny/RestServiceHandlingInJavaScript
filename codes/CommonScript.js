function getHeroes(startIndex, itemCount, orderField, orderDirection) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/hero?start=" + startIndex + "&count=" + itemCount + "&orderfield=" + orderField + "&orderdirection=" + orderDirection, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonContent = JSON.parse(oReq.responseText);
      //var output = "<tr><td class='column1'>Id</td><td class='column2'>Name</td><td class='column3'>Description</td><td class='column4'> </td><td class='column5'> </td><td class='column6'> </td></tr>";
	  var output = "";
      for (x in jsonContent) {
        output += "<tr><td class='column1'>" + jsonContent[x].id + "</td><td class='column2'>" + jsonContent[x].name + "</td><td class='column3'>" + jsonContent[x].description + "</td><td class='column4' onclick='getHeroById(" + jsonContent[x].id + ")'><img src='infoIcon.png 'alt='info' class='iconImage'/></td><td class='column5' onclick='modifyHeroIconOperation(" + jsonContent[x].id + ")'><img src='modifyIcon2.png 'alt='modify' class='iconImage'/></td><td class='column6' onclick='deleteHeroById(" + jsonContent[x].id + ")'><img src='deleteIcon2.png 'alt='delete' class='iconImage'/></td></tr>";
      }
      document.getElementById("HeroesTableBody").innerHTML = output;
	  formatHeroesTableBody();
	  if (orderField == 'id') {
	    if (orderDirection == "ASC") {
		  showArrow("idArrowUp");
		} else {
		  showArrow("idArrowDown");
		}
	  } else if (orderField == "name") {
	    if (orderDirection == "ASC") {
		  showArrow("nameArrowUp");
		} else {
		  showArrow("nameArrowDown");
		}
	  } else {
	    if (orderDirection == "ASC") {
		  showArrow("descriptionArrowUp");
		} else {
		  showArrow("descriptionArrowDown");
		}
	  }
    }
  };
}

function getHeroesByColumn(caller) {
  var startIndex = document.getElementById("tableStartIndex").value;
  var itemCount = document.getElementById("tableItemCount").value;
  var orderField = document.getElementById("tableOrderField").value;
  var orderDirection = document.getElementById("tableOrderDirection").value;
  if (orderField == 'id') {
	    if (orderDirection == "ASC") {
		  hideArrow("idArrowUp");
		} else {
		  hideArrow("idArrowDown");
		}
	  } else if (orderField == "name") {
	    if (orderDirection == "ASC") {
		  hideArrow("nameArrowUp");
		} else {
		  hideArrow("nameArrowDown");
		}
	  } else {
	    if (orderDirection == "ASC") {
		  hideArrow("descriptionArrowUp");
		} else {
		  hideArrow("descriptionArrowDown");
    }
  }
  if (orderField == caller) {
    if (orderDirection == "ASC") {
	  orderDirection = "DESC";
      document.getElementById("tableOrderDirection").value = "DESC";
	} else {
	  orderDirection = "ASC";
      document.getElementById("tableOrderDirection").value = "ASC";
	}
  } else {
    orderField = caller;
    document.getElementById("tableOrderField").value = caller;
	orderDirection = "ASC";
	document.getElementById("tableOrderDirection").value = "ASC";
  }
  getHeroes(startIndex, itemCount, orderField, orderDirection);
}

function getHeroesByRefresh() {
  getHeroes(document.getElementById("tableStartIndex").value, document.getElementById("tableItemCount").value, document.getElementById("tableOrderField").value, document.getElementById("tableOrderDirection").value);
}

function getHeroById(heroId) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/hero/" + heroId, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonContent = JSON.parse(oReq.responseText);
	  document.getElementById("heroId").value = jsonContent["id"];
	  document.getElementById("heroName").value = jsonContent["name"];
	  document.getElementById("heroDescription").value = jsonContent["description"];
    }
  };
}

function addHero() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("heroName").value) + '&desc=' + encodeURIComponent(document.getElementById("heroDescription").value);
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://81.2.241.234:8080/hero", true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(stringData);
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

function modifyHeroById() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("heroName").value) + '&desc=' + encodeURIComponent(document.getElementById("heroDescription").value);
  var oReq = new XMLHttpRequest();
  oReq.open("PUT", "http://81.2.241.234:8080/hero/" + document.getElementById("heroId").value, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(stringData);
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

function deleteHeroById(heroId) {
  var oReq = new XMLHttpRequest();
  oReq.open("DELETE", "http://81.2.241.234:8080/hero/" + heroId, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

function getSpecies(startIndex, itemCount, orderField, orderDirection) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/species?start=" + startIndex + "&count=" + itemCount + "&orderfield=" + orderField + "&orderdirection=" + orderDirection, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonContent = JSON.parse(oReq.responseText);
      //var output = "<tr><td class='column1'>Id</td><td class='column2'>Name</td><td class='column3'>Description</td><td class='column4'></td><td class='column5'></td><td class='column6'></td></tr>";
	  var output = "";
      for (x in jsonContent) {
        output += "<tr><td class='column1'>" + jsonContent[x].id + "</td><td class='column2'>" + jsonContent[x].name + "</td><td class='column3'>" + jsonContent[x].description + "</td><td class='column4' onclick='getSpeciesById(" + jsonContent[x].id + ")'><img src='infoIcon.png 'alt='info' class='iconImage'/></td><td class='column5' onclick='modifySpeciesIconOperation(" + jsonContent[x].id + ")'><img src='modifyIcon2.png 'alt='modify' class='iconImage'/></td><td class='column6' onclick='deleteSpeciesById(" + jsonContent[x].id + ")'><img src='deleteIcon2.png 'alt='delete' class='iconImage'/></td></tr>";
      }
      document.getElementById("SpeciesTableBody").innerHTML = output;
	  formatSpeciesTableBody();
	  if (orderField == 'id') {
	    if (orderDirection == "ASC") {
		  showArrow("idArrowUp");
		} else {
		  showArrow("idArrowDown");
		}
	  } else if (orderField == "name") {
	    if (orderDirection == "ASC") {
		  showArrow("nameArrowUp");
		} else {
		  showArrow("nameArrowDown");
		}
	  } else {
	    if (orderDirection == "ASC") {
		  showArrow("descriptionArrowUp");
		} else {
		  showArrow("descriptionArrowDown");
		}
	  }
    }
  };
}

function getSpeciesByColumn(caller) {
  var startIndex = document.getElementById("tableStartIndex").value;
  var itemCount = document.getElementById("tableItemCount").value;
  var orderField = document.getElementById("tableOrderField").value;
  var orderDirection = document.getElementById("tableOrderDirection").value;
  if (orderField == 'id') {
	    if (orderDirection == "ASC") {
		  hideArrow("idArrowUp");
		} else {
		  hideArrow("idArrowDown");
		}
	  } else if (orderField == "name") {
	    if (orderDirection == "ASC") {
		  hideArrow("nameArrowUp");
		} else {
		  hideArrow("nameArrowDown");
		}
	  } else {
	    if (orderDirection == "ASC") {
		  hideArrow("descriptionArrowUp");
		} else {
		  hideArrow("descriptionArrowDown");
    }
  }
  if (orderField == caller) {
    if (orderDirection == "ASC") {
	  orderDirection = "DESC";
      document.getElementById("tableOrderDirection").value = "DESC";
	} else {
	  orderDirection = "ASC";
      document.getElementById("tableOrderDirection").value = "ASC";
	}
  } else {
    orderField = caller;
    document.getElementById("tableOrderField").value = caller;
	orderDirection = "ASC";
	document.getElementById("tableOrderDirection").value = "ASC";
  }
  getSpecies(startIndex, itemCount, orderField, orderDirection);
}

function getSpeciesByRefresh() {
  getSpecies(document.getElementById("tableStartIndex").value, document.getElementById("tableItemCount").value, document.getElementById("tableOrderField").value, document.getElementById("tableOrderDirection").value);
}

function getSpeciesById(speciesId) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/species/" + speciesId, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonContent = JSON.parse(oReq.responseText);
	  document.getElementById("speciesId").value = jsonContent["id"];
	  document.getElementById("speciesName").value = jsonContent["name"];
	  document.getElementById("speciesDescription").value = jsonContent["description"];
    }
  };
}

function addSpecies() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("speciesName").value) + '&desc=' + encodeURIComponent(document.getElementById("speciesDescription").value);
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://81.2.241.234:8080/species", true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(stringData);
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

function modifySpeciesById() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("speciesName").value) + '&desc=' + encodeURIComponent(document.getElementById("speciesDescription").value);
  var oReq = new XMLHttpRequest();
  oReq.open("PUT", "http://81.2.241.234:8080/species/" + document.getElementById("speciesId").value, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(stringData);
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

function deleteSpeciesById(speciesId) {
  var oReq = new XMLHttpRequest();
  oReq.open("DELETE", "http://81.2.241.234:8080/species/" + speciesId, true);
  oReq.send();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

function getYear() {
  document.getElementById("year").innerHTML = new Date().getFullYear();
}

window.addEventListener("load", function(event) {
  loadTemplate("#mainPage");
});

function loadTemplate(pTemplateID) {
  var dest = document.querySelector('#contentContainer');
  dest.innerHTML = "";
  dest.appendChild(document.importNode(document.querySelector(pTemplateID).content, true));
}

function formatHeroesTableBody() {
  document.getElementById("HeroesTableBody").style.height = '100%';
  document.getElementById("HeroesTableBody").style.width = '100%';
  document.getElementById("HeroesTableBody").style.overflowY = "scroll";
}

function formatSpeciesTableBody() {
  document.getElementById("SpeciesTableBody").style.height = '100%';
  document.getElementById("SpeciesTableBody").style.width = '100%';
  document.getElementById("SpeciesTableBody").style.overflowY = "scroll";
}

function setButtonDisabled(buttonId) {
  document.getElementById(buttonId).disabled = true;
}

function setButtonEnabled(buttonId) {
  document.getElementById(buttonId).disabled = false;
}

function modifyHeroIconOperation(heroId) {
  getHeroById(heroId);
  setButtonEnabled('modifyHeroButton');
}

function modifySpeciesIconOperation(speciesId) {
  getSpeciesById(speciesId);
  setButtonEnabled('modifySpeciesButton');
}

function hideArrow(arrowId) {
  document.getElementById(arrowId).style.display = 'none';
}

function showArrow(arrowId) {
  document.getElementById(arrowId).style.display = 'block';
}
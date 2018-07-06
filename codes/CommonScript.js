// Handles the get all operation of the hero entities.
function getHeroes(startIndex, itemCount, orderField, orderDirection) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/hero?start=" + startIndex + "&count=" + itemCount + "&orderfield=" + orderField + "&orderdirection=" + orderDirection, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Convert the result data to JSON.
      var jsonContent = JSON.parse(oReq.responseText);
	  // Create the table content from the result data.
	  var output = "";
      for (x in jsonContent) {
        output += "<tr><td class='column1'>" + jsonContent[x].id + "</td><td class='column2'>" + jsonContent[x].name + "</td><td class='column3'>" + jsonContent[x].description + "</td><td class='column4' onclick='getHeroById(" + jsonContent[x].id + ")'><img src='infoIcon.png 'alt='info' class='iconImage'/></td><td class='column5' onclick='modifyHeroIconOperation(" + jsonContent[x].id + ")'><img src='modifyIcon2.png 'alt='modify' class='iconImage'/></td><td class='column6' onclick='deleteHeroById(" + jsonContent[x].id + ")'><img src='deleteIcon2.png 'alt='delete' class='iconImage'/></td></tr>";
      }
      document.getElementById("HeroesTableBody").innerHTML = output;
	  // Format table the body.
	  formatHeroesTableBody();
	  // Set the table order type and direction.
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

// Handles the sorting of the heroes table.
function getHeroesByColumn(caller) {
  var startIndex = document.getElementById("tableStartIndex").value;
  var itemCount = document.getElementById("tableItemCount").value;
  var orderField = document.getElementById("tableOrderField").value;
  var orderDirection = document.getElementById("tableOrderDirection").value;
  // Set the table order type and direction.
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
  // Refresh the table content.
  getHeroes(startIndex, itemCount, orderField, orderDirection);
}

// Refreshes the hero entities in the table.
function getHeroesByRefresh() {
  getHeroes(document.getElementById("tableStartIndex").value, document.getElementById("tableItemCount").value, document.getElementById("tableOrderField").value, document.getElementById("tableOrderDirection").value);
}

// Handles the get by id operation of a hero entity.
function getHeroById(heroId) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/hero/" + heroId, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Fill the controls with the result data.
      var jsonContent = JSON.parse(oReq.responseText);
	  document.getElementById("heroId").value = jsonContent["id"];
	  document.getElementById("heroName").value = jsonContent["name"];
	  document.getElementById("heroDescription").value = jsonContent["description"];
    }
  };
}

// Handles the create operation of a hero entity.
function addHero() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("heroName").value) + '&desc=' + encodeURIComponent(document.getElementById("heroDescription").value);
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://81.2.241.234:8080/hero", true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the data.
  oReq.send(stringData);
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

// Handles the modify operation of a hero entity.
function modifyHeroById() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("heroName").value) + '&desc=' + encodeURIComponent(document.getElementById("heroDescription").value);
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("PUT", "http://81.2.241.234:8080/hero/" + document.getElementById("heroId").value, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the data.
  oReq.send(stringData);
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

// Handles the delete operation of a hero entity.
function deleteHeroById(heroId) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("DELETE", "http://81.2.241.234:8080/hero/" + heroId, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getHeroes(0, 0, "id", "ASC");
    }
  };
}

// Handles the get all operation of a species entities.
function getSpecies(startIndex, itemCount, orderField, orderDirection) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/species?start=" + startIndex + "&count=" + itemCount + "&orderfield=" + orderField + "&orderdirection=" + orderDirection, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Convert the result data to JSON.
      var jsonContent = JSON.parse(oReq.responseText);
	  // Create the table content from the result data.
	  var output = "";
      for (x in jsonContent) {
        output += "<tr><td class='column1'>" + jsonContent[x].id + "</td><td class='column2'>" + jsonContent[x].name + "</td><td class='column3'>" + jsonContent[x].description + "</td><td class='column4' onclick='getSpeciesById(" + jsonContent[x].id + ")'><img src='infoIcon.png 'alt='info' class='iconImage'/></td><td class='column5' onclick='modifySpeciesIconOperation(" + jsonContent[x].id + ")'><img src='modifyIcon2.png 'alt='modify' class='iconImage'/></td><td class='column6' onclick='deleteSpeciesById(" + jsonContent[x].id + ")'><img src='deleteIcon2.png 'alt='delete' class='iconImage'/></td></tr>";
      }
      document.getElementById("SpeciesTableBody").innerHTML = output;
	  // Format table the body.
	  formatSpeciesTableBody();
	  // Set the table order type and direction.
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

// Handles the sorting of the species table.
function getSpeciesByColumn(caller) {
  var startIndex = document.getElementById("tableStartIndex").value;
  var itemCount = document.getElementById("tableItemCount").value;
  var orderField = document.getElementById("tableOrderField").value;
  var orderDirection = document.getElementById("tableOrderDirection").value;
  // Set the table order type and direction.
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
  // Refresh the table content.
  getSpecies(startIndex, itemCount, orderField, orderDirection);
}

// Refreshes the species entities in the table.
function getSpeciesByRefresh() {
  getSpecies(document.getElementById("tableStartIndex").value, document.getElementById("tableItemCount").value, document.getElementById("tableOrderField").value, document.getElementById("tableOrderDirection").value);
}

// Handles the get by id operation of a species entity.
function getSpeciesById(speciesId) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://81.2.241.234:8080/species/" + speciesId, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Fill the controls with the result data.
      var jsonContent = JSON.parse(oReq.responseText);
	  document.getElementById("speciesId").value = jsonContent["id"];
	  document.getElementById("speciesName").value = jsonContent["name"];
	  document.getElementById("speciesDescription").value = jsonContent["description"];
    }
  };
}

// Handles the create operation of a species entity.
function addSpecies() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("speciesName").value) + '&desc=' + encodeURIComponent(document.getElementById("speciesDescription").value);
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://81.2.241.234:8080/species", true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the data.
  oReq.send(stringData);
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

// Handles the update operation of a species entity.
function modifySpeciesById() {
  var stringData = 'name=' + encodeURIComponent(document.getElementById("speciesName").value) + '&desc=' + encodeURIComponent(document.getElementById("speciesDescription").value);
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("PUT", "http://81.2.241.234:8080/species/" + document.getElementById("speciesId").value, true);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the data.
  oReq.send(stringData);
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

// Handles the delete operation of a species entity.
function deleteSpeciesById(speciesId) {
  // Set the request to the rest service.
  var oReq = new XMLHttpRequest();
  oReq.open("DELETE", "http://81.2.241.234:8080/species/" + speciesId, true);
  oReq.send();
  // The state of the request changed.
  oReq.onreadystatechange = function() {
	// The state is ready and the status is OK.
    if (this.readyState == 4 && this.status == 200) {
	  // Refresh the table content.
      getSpecies(0, 0, "id", "ASC");
    }
  };
}

// Gets the current year.
function getYear() {
  document.getElementById("year").innerHTML = new Date().getFullYear();
}

// Adds a load event for the window.
window.addEventListener("load", function(event) {
  loadTemplate("#mainPage");
});

// Sets the default template when the window loads.
function loadTemplate(pTemplateID) {
  var dest = document.querySelector('#contentContainer');
  dest.innerHTML = "";
  dest.appendChild(document.importNode(document.querySelector(pTemplateID).content, true));
}

// Formats the table body of the heroes entities.
function formatHeroesTableBody() {
  document.getElementById("HeroesTableBody").style.height = '100%';
  document.getElementById("HeroesTableBody").style.width = '100%';
  document.getElementById("HeroesTableBody").style.overflowY = "scroll";
}

// Formats the table body of the species entities.
function formatSpeciesTableBody() {
  document.getElementById("SpeciesTableBody").style.height = '100%';
  document.getElementById("SpeciesTableBody").style.width = '100%';
  document.getElementById("SpeciesTableBody").style.overflowY = "scroll";
}

// Disables the given button.
function setButtonDisabled(buttonId) {
  document.getElementById(buttonId).disabled = true;
}

// Enables the given button.
function setButtonEnabled(buttonId) {
  document.getElementById(buttonId).disabled = false;
}

// Gets the hero recors and enables the modification button.
function modifyHeroIconOperation(heroId) {
  getHeroById(heroId);
  setButtonEnabled('modifyHeroButton');
}

// Gets the species recors and enables the modification button.
function modifySpeciesIconOperation(speciesId) {
  getSpeciesById(speciesId);
  setButtonEnabled('modifySpeciesButton');
}

// Hides the given sort order indicator arrow.
function hideArrow(arrowId) {
  document.getElementById(arrowId).style.display = 'none';
}

// Shows the given sort order indicator arrow.
function showArrow(arrowId) {
  document.getElementById(arrowId).style.display = 'block';
}

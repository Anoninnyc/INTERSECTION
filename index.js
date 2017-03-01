
  const intersection = {
    top: $("#intersection").position().top,
    left: $("#intersection").position().left
  };

  intersection.right = intersection.left + 300;
  intersection.bottom = intersection.top + 346;

  const ends = {
    top: intersection.top - 300,
    bottom: intersection.bottom + 300,
    right: intersection.right + 300,
    left: intersection.left - 300
  };



  //**********************//
      // Let's track the lights!
  let vertGreen = false;
  let horizGreen = false;
  const colors = ["green", "yellow", "red", "red"];
  let cars = 0;
  $(document).ready(function() {

    let timer = -1;

    interval = setInterval(function() {
      // Main traffic lights!!
      timer++;
      const vertColorIdx = timer % 4;
      const horizColorIdx = (timer + 2) % 4;
      const vertLight = $(`.vertLight>.${colors[vertColorIdx]}`);
      const horizLight = $(`.horizLight>.${colors[horizColorIdx]}`);
      const otherLights = $(".vertLight>div,.horizLight>div");
      otherLights.css("background", "transparent");
      vertLight.css("background-color", `${colors[vertColorIdx]}`);
      horizLight.css("background-color", `${colors[horizColorIdx]}`);

      if (vertColorIdx < 2) {
        vertGreen = true;
      } else {
        vertGreen = false
      }
      if (horizColorIdx < 2) {
        horizGreen = true;
      } else {
        horizGreen = false;
      }

      /**********************/

      /**********************/
      // Let's add cars tonour Intersection!
      const addCar = (location, carDirection) => {
        if (Math.random() < 0.3) {
          $(location).each(function() {
            $(this).append(`<div class=${carDirection} id=${cars}></div>`);
            cars++;
          });
        }
      };

      const locationDirection = {
        ".middle.right": "eastCar",
        ".middle.bottom": "northCar",
        ".middle.down": "southCar",
        ".middle.left span": "westCar"
      };

      for (let location in locationDirection) {
        addCar(location, locationDirection[location]);
      }

      //**********************//



      //**********************//
      //Let move the cars
      // Not enough commonalities to abstract to a general moveCar function :(



      $(".eastCar").each(function() {
        const position = $(this).position();
        //remove off-screen cars
        if (position.left > ends.right) {
          $(this).remove();
        }
        // speed up cars in the intersection!
        if (vertGreen && position.left + 80 > intersection.left && position.left < intersection.right) {
          $(this).animate({
            "left": "+=450px"
          }, "slow");
        }
        // else move them along normally
        else if (vertGreen || position.left + 30 > intersection.right) {
          $(this).animate({
            "left": "+=80px"
          }, "slow");
        }
      });



      $(".northCar").each(function() {
        const position = $(this).position();
        if (position.top < ends.top) {
          $(this).remove();
        }
        if (horizGreen && position.top - 80 < intersection.bottom && position.top > intersection.top) {
          $(this).animate({
            "bottom": "+=450px"
          }, "slow");
        }
        else if (horizGreen || position.top < intersection.top) {
          $(this).animate({
            "bottom": "+=70px"
          }, "slow");
        }
      });

      $(".southCar").each(function() {
        const position = $(this).position();

        if (position.top + 30 > ends.bottom) {
          $(this).remove();
        }
        if (horizGreen && position.top + 110 > intersection.top && position.top < intersection.bottom) {
          $(this).animate({
            "bottom": "-=450px"
          }, "slow");
        }
        else if (horizGreen || position.top + 30 > intersection.bottom) {
          $(this).animate({
            "bottom": "-=80px"
          }, "slow");
        }
      });


      $(".westCar").each(function() {
        const position = $(this).position();
        if (position.top < intersection.left) {
          $(this).remove();
        }
        if (vertGreen && position.left - 80 < intersection.right && position.left > intersection.left) {
          $(this).animate({
            "left": "-=450px"
          }, "slow");
        }
        else if (vertGreen || position.left < intersection.left) {
          $(this).animate({
            "left": "-=80px"
          }, "slow");
        }
      });
    }, 1000);

  });
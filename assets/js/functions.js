$(document).ready(function() {
  lineChartNormal("myChart");
  lineChartNormal("chart-line-modal");
  linChartOverBg("line-chart-overbg");
  linChartOverBg("line-chart-overbg-modal");
  pieChart("pieChart", "chart-legend");
  pieChart("pieChart_2", "chart-legend_2");
  pieChart("pieChart_3", "chart-legend_3");
  QuickButtonAction();
  toogleSideBar();

  $("#myTab li:last-child a").tab("show");
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left"
    },
    function(start, end, label) {
      console.log(
        "A new date selection was made: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD")
      );
    }
  );

  SubAccount.bindingDeleteEvent();
  Notification.init();
  SiteManagement.init();
});

function random(length) {
  let elm = [];
  for (let index = 0; index < length; index++) {
    elm.push(Math.floor(Math.random() * 100 + index));
  }
  return elm;
}

function lineChartNormal(id) {
  // Get started!
  var ctx = document.getElementById(id);

  if (ctx) {
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "02:15",
          "03:15",
          "04:15",
          "05:15",
          "06:15",
          "07:15",
          "08:15",
          "09:15"
        ],
        datasets: [
          {
            data: random(9),
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: random(9),
            // data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
          },
          {
            data: random(9),
            // data: [168,170,178,190,203,276,408,547,675,734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: random(9),
            // data: [40,20,10,16,24,38,74,167,508,784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        elements: {
          line: {
            tension: 0.01
          }
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Visits"
              }
            }
          ]
        }
      }
    });
  }
}

function linChartOverBg(id) {
  var ctx = document.getElementById(id);

  if (ctx) {
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "02:15",
          "03:15",
          "04:15",
          "05:15",
          "06:15",
          "07:15",
          "08:15",
          "09:15"
        ],
        datasets: [
          {
            data: random(100),
            label: "Africa",
            borderColor: "#caeecf",
            backgroundColor: "#ecfaec"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          line: {
            tension: 0.01
          }
        },
        legend: {
          display: false
        },

        scales: {
          yAxes: [
            {
              // display: false,
              gridLines: {
                color: "#ddd"
              },
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              // display: false
              gridLines: {
                color: "#ddd"
              },
              ticks: {
                display: false
              }
            }
          ]
        },
        animation: {
          onComplete: function() {
            // var sourceCanvas = myChart.chart.canvas; var copyWidth =
            // myChart.scales["y-axis-0"].width; var copyHeight =
            // myChart.scales["y-axis-0"].height +   myChart.scales["y-axis-0"].top +   10;
            // var targetCtx = document   .getElementById("lineChartAxis")
            // .getContext("2d"); targetCtx.canvas.width = copyWidth; targetCtx.drawImage(
            // sourceCanvas,   0,   0,   copyWidth,   copyHeight,   0,   0,   copyWidth,
            // copyHeight );
          }
        }
      }
    });
  }
}

function pieChart(id, legendId) {
  var ctx = document.getElementById(id);
  var legend = document.getElementById(legendId);
  // var ctx = canvas.getContext('2d'); Global Options:
  Chart.defaults.global.defaultFontColor = "#3eb642";
  Chart.defaults.global.defaultFontSize = 12;

  var data = {
    labels: [
      "American high defense node-CF ",
      "US VU provider-jp1",
      "XX Network Technology Co., Ltd.-HK1"
    ],
    datasets: [
      {
        fill: true,
        backgroundColor: ["#3eb642", "#319734", "#4cda50"],
        data: random(3),
        // Notice the borderColor
        borderColor: ["#3eb642", "#319734", "#3eb642"],
        borderWidth: [2, 2]
      }
    ]
  };

  // Notice the rotation from the documentation.

  var options = {
    responsive: true,
    title: {
      display: false,
      position: "top"
    },
    rotation: -0.7 * Math.PI,
    legend: {
      position: "left",
      display: false
    },
    legendCallback: function(c) {
      var text = [];
      text.push('<ul class="' + myBarChart.id + '-legend p-0">');
      var data = myBarChart.data;
      var datasets = data.datasets;
      var labels = data.labels;
      if (datasets.length) {
        for (var i = 0; i < datasets[0].data.length; ++i) {
          let styles = {
            "background-color": datasets[0].backgroundColor[i],
            color: datasets[0].backgroundColor[i],
            width: "10px",
            height: "10px"
          };
          styles = JSON.stringify(styles).replace(/\{|}|"|'/g, "");
          styles = styles.replace(/\,/g, ";");
          text.push(
            '<li class="d-flex mb-2" ><span class="font-weight-bold d-inline rounded mr-1 fl ' +
              'oat-left mt-2" style="' +
              styles +
              '"></span>'
          );
          if (labels[i]) {
            // calculate percentage
            var total = datasets[0].data.reduce(function(
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = datasets[0].data[i];
            var precentage = Math.floor((currentValue / total) * 100 + 0.5);

            text.push(labels[i] + "<br/> (" + precentage + "%)");
          }
          text.push("</li>");
        }
      }
      text.push("</ul>");
      return text.join("");
    }
  };

  if (ctx) {
    // Chart declaration:
    var myBarChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options
    });
  }
  if (legend) {
    legend.innerHTML = myBarChart.generateLegend();
  }

  // Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way
  // :|
}

function QuickButtonAction() {
  const container = $(".quick--control-button");
  //trigger click when touch button main : X
  container.children(".btn-trigger-action").on("click", function() {
    const hasRotate = $(this)
      .children("span")
      .hasClass("rotate");
    if (!hasRotate) {
      $(this)
        .children("span")
        .addClass("rotate");
      $(this)
        .siblings("button")
        .removeClass("invisible");
    } else {
      $(this)
        .children("span")
        .removeClass("rotate");
      $(this)
        .siblings("button")
        .addClass("invisible");
    }
  });

  // binding event for button inside block
  container.children("button[data-target]").on("click", function() {
    const modal = $(this).data("target");

    if ($(modal).length > 0) {
      $(modal).addClass("shown");
    }
  });

  // binding event for button close for modal add domain
  $("button[data-dismiss]").on("click", function() {
    const close = $(this).data("dismiss");

    if ($(close).length > 0) {
      $(close).removeClass("shown");
      $(close).modal("hide");
    }
  });
}

function toogleSideBar() {
  const btnToggle = $(".toggle-sidebar");
  const sidebarMenu = $(btnToggle).data("sidebar");

  if (sidebarMenu) {
    $(btnToggle).on("click", function() {
      const parent = $(sidebarMenu).parent();
      const isActiveSidebar = $(parent).hasClass("toggle-vertical");
      if (isActiveSidebar) {
        $(parent).removeClass("toggle-vertical");
      } else {
        $(parent).addClass("toggle-vertical");
      }
    });
  }
}

const SubAccount = {
  // binding event button delete on card sub-account
  bindingDeleteEvent: function() {
    const cardSubAccount = $(".box-sub__account"); //container card

    if (cardSubAccount) {
      const btnDelete = $(cardSubAccount).find(".card-control-delete");

      // binding event button delete on card
      btnDelete.on("click", function() {
        const containerOverlay = $(this)
          .parents(".box-sub__account")
          .find(".card-overlay");
        const btnCancel = $(this)
          .parents(".box-sub__account")
          .find(".card-control-cancel");

        $(containerOverlay).addClass("active");

        // binding event close overlay
        btnCancel.on("click", function() {
          $(containerOverlay).removeClass("active");
        });
      });
    }
  }
};

const Notification = {
  wrapperNoti: $("#notification-wrapper"), //container notification
  overlayContent: $("#overlay-content"), //container overlay
  icoToogleNoti: $("#toggle-noti--panel"), //container btn toggle notification panel
  icoToogleConfig: $("#config-noti"), //container btn toggle config panel
  bindingMoreOption: function() {
    if (this.wrapperNoti) {
      const btnMore = $(this.wrapperNoti).find("#more-top-noti");
      btnMore.on("click", function() {
        const boxMoreOpt = $(this).data("target");
        if (boxMoreOpt) {
          const hasActive = $(boxMoreOpt).hasClass("active");
          if (hasActive) {
            $(boxMoreOpt).removeClass("active");
          } else {
            $(boxMoreOpt).addClass("active");
          }
        }
      });
    }
  },
  toggleNotification: function() {
    if (this.icoToogleNoti) {
      const self = this;
      this.icoToogleNoti.on("click", function() {
        const containerNoti = $(this).data("target");
        const btnClose = $(containerNoti).find("#close-more-top-noti");
        if (containerNoti) {
          self.overlayContent.addClass("active");
          $(containerNoti).addClass("active");

          if (btnClose) {
            $(btnClose).on("click", function() {
              self.overlayContent.removeClass("active");
              $(containerNoti).removeClass("active");
            });
          }
        }
      });
    }
  },
  toggleConfigNotificaton: function() {
    if (this.icoToogleConfig) {
      this.icoToogleConfig.on("click", function() {
        const containerNoti = $(this).data("target");
        const btnClose = $(containerNoti).find(".close-config-noti");
        if (containerNoti) {
          $(containerNoti).addClass("active");

          if (btnClose) {
            $(btnClose).on("click", function() {
              $(containerNoti).removeClass("active");
            });
          }
        }
      });
    }
  },
  init: function() {
    this.toggleNotification();
    this.toggleConfigNotificaton();
    this.bindingMoreOption();
  }
};

const SiteManagement = {
  modalAddIP: $("#modal-addIp"),
  nextEventStep: function() {
    const btnNext = $(this.modalAddIP).find(".btn-dispatch__step");

    if (btnNext) {
      btnNext.on("click", function() {
        const tabItem = $(this).data("target");
        if (tabItem) {
          $(tabItem).trigger("click");
        }
      });
    }
  },
  addNewLineIP: function() {
    const tabPanel = $("#tb-addIp");

    if (tabPanel) {
      const btnAdd = $(tabPanel).find("#btn-add_newIP");
      const pointAdd = $(tabPanel).find("#point-itemAdd");
      if (btnAdd) {
        $(btnAdd).on("click", function() {
          const tlp = $(this).data("template");
          const lenItem = $(tabPanel).find(".line-item-inputIp").length;
          if (lenItem < 10) {
            const _html = $(tlp).html();
            $(pointAdd).before(_html);
          }
        });
      }
    }
  },

  removeLineIP: function() {
    const tabPanel = $("#tb-addIp");

    if (tabPanel) {
      $(tabPanel).on("click", ".remove-LineIP", function() {
        const parent = $(this).closest(".line-item-inputIp");
        $(parent).remove();
      });
    }
  },

  init: function() {
    this.nextEventStep();
    this.addNewLineIP();
    this.removeLineIP();
    $("body").popover({
      trigger: "focus",
      selector: '[rel="popover"]'
    });
  }
};

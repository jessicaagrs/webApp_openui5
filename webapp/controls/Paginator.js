sap.ui.define([
    "sap/ui/core/Control",
], function (Control) {
	"use strict";
	return Control.extend("MyUI5WebApp.controls.Paginator", {
		metadata : {
            properties : {
                tittleAllPages: {type: "string", defaultValue: "Todas a páginas"},
                count: {type : "int", defaultValue : 1},
                previousText: 	{type : "string", defaultValue : ""},
                nextText: {type : "string", defaultValue : ""},
                currentPage: {type : "int", defaultValue :1},
                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "100%"
                },
                popoverWidth: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "30%"
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "auto"
                }
            },
            events : {
				onSelectPage : {
					parameters : {
                        selectedPage : {type : "int"},
                        currentPage : {type : "int"},
					}
				}
			}
        },

        _opoOverAllPages : new sap.m.ResponsivePopover(),
		init : function () {
            let title = this.getTittleAllPages();
            this._opoOverAllPages.setPlacement(sap.m.PlacementType.Top);
            this._opoOverAllPages.setTitle(title);
            this._opoOverAllPages.setContentWidth(this.getPopoverWidth());

        },

		renderer : function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.write(">");
            var numPages = oControl.getCount();
            var current = oControl.getCurrentPage();
            let middleText = [current,numPages].join("/")
            let previous = new sap.m.Button({
                text: oControl.getPreviousText(),
                icon: "sap-icon://navigation-left-arrow",
                press:() => oControl.fireEvent("onSelectPage",{
                    selectedPage : (oControl.getCurrentPage() - 1),
                    currentPage : oControl.getCurrentPage(),
                })

            });
            let next  = new sap.m.Button({
                text: oControl.getNextText(),
                icon:"sap-icon://navigation-right-arrow",
                press:() => oControl.fireEvent("onSelectPage",{
                    selectedPage : (oControl.getCurrentPage() + 1),
                    currentPage : oControl.getCurrentPage(),
                })
            });
            let middle = new sap.m.Button({
                text: middleText,
                press: (oEvent)=>{
                    oControl.showAllPage(oEvent, numPages, current);
                }
            })
            previous.addStyleClass("sapUiTinyMarginEnd");
            middle.addStyleClass("sapUiTinyMarginEnd");
            oRM.renderControl(previous);
            oRM.renderControl(middle);
            oRM.renderControl(next);
			oRM.write("</div>");
        },

        showAllPage(oEvent, numPages, current){

            if(this._opoOverAllPages.isOpen())     {
                this._opoOverAllPages.close()
                return;
            }
            var flex = new sap.m.FlexBox();
            flex.setJustifyContent(sap.m.FlexAlignContent.SpaceBetween)
            flex.setAlignItems(sap.m.FlexAlignItems.Stretch);
            flex.setWrap(sap.m.FlexWrap.Wrap)
            flex.addStyleClass("sapUiTinyMargin");
            let that = this;
            let currentPage = that.getCurrentPage();
            for (let index = 1; index <= numPages; index++) {
                const page = numPages;
                let button = new sap.m.Button({
                    text:index,
                    press:() => that.fireEvent("onSelectPage",{
                        selectedPage : index,
                        currentPage : currentPage,
                    })
                });
                if(current == index)
                    button.setType("Accept")
                flex.addItem(button);
            }
            this._opoOverAllPages.removeAllContent();
            this._opoOverAllPages.addContent(flex);
            this._opoOverAllPages.openBy(oEvent.getSource());
        }

	});
});

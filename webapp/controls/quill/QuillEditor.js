sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";

	return Control.extend("MyUI5WebApp.controls.quill.QuillEditor", {

		metadata: {
			properties: {
				width: { type: "string", defaultValue: "100%" },
				placeHolder: { type: "string", defaultValue: "" },
				value: { type: "string", defaultValue: null },
				theme: { type: "string", defaultValue: "snow" },
				enabled: { type: "boolean", defaultValue: "true" }
			}
		},

		init: function () {

			$.sap.includeStyleSheet("webapp/controls/quill/quill.snow.css");
			$.sap.includeStyleSheet("webapp/controls/quill/quill.bubble.css");
			$.sap.require("MyUI5WebApp/controls/quill/quill")
		},

		onAfterRendering: function () {

			this.quill = new Quill('#' + this.sId + '-editor-container', {
				modules: {
					toolbar: '#' + this.sId + '-toolbar-container'
				},
				placeholder: this.getPlaceHolder(),
				theme: this.getTheme()
			});

			this.quill.enable(this.getEnabled())

			var that = this;

			this.quill.on('text-change', function (delta, oldDelta, source) {

				if (source == 'user') {
					that.setValue(that.quill.container.firstChild.innerHTML, true);
				}
			});

			this.setValue = function (value, changedByUser = false) {

                if(!value)
					value = '';

                if(!changedByUser)
                    this.quill.clipboard.dangerouslyPasteHTML(value);

                this.setProperty('value', value)
            }
		},

		renderer: function (oRM, oControl) {

			oRM.write(`
			  <div id="` + oControl.sId + `-standalone-container" style="width:` + oControl.getWidth() + `">
  				<div id="` + oControl.sId + `-toolbar-container">
    				<span class="ql-formats">
						<select class="ql-font"></select>
						<select class="ql-size"></select>
    				</span>
					<span class="ql-formats">
						<button class="ql-bold"></button>
						<button class="ql-italic"></button>
						<button class="ql-underline"></button>
						<button class="ql-strike"></button>
					</span>
					<span class="ql-formats">
						<select class="ql-color"></select>
						<select class="ql-background"></select>
					</span>
					<span class="ql-formats">
						<button class="ql-script" value="sub"></button>
						<button class="ql-script" value="super"></button>
					</span>
					<span class="ql-formats">
						<button class="ql-header" value="1"></button>
						<button class="ql-header" value="2"></button>
						<button class="ql-blockquote"></button>
						<button class="ql-code-block"></button>
					</span>
					<span class="ql-formats">
						<button class="ql-list" value="ordered"></button>
						<button class="ql-list" value="bullet"></button>
						<button class="ql-indent" value="-1"></button>
						<button class="ql-indent" value="+1"></button>
					</span>
					<span class="ql-formats">
						<button class="ql-direction" value="rtl"></button>
						<select class="ql-align"></select>
					</span>
					<span class="ql-formats">
						<button class="ql-link"></button>
						<button class="ql-image"></button>
						<button class="ql-video"></button>
					</span>
						<span class="ql-formats">
						<button class="ql-clean"></button>
					</span>
  				</div>
				  <div id="` + oControl.sId + `-editor-container"></div>
			</div>`)
		}
	});
});

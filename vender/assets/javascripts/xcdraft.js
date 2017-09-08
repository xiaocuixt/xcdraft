$.fn.autoDraft = function () {
  'use strict';
  if (!localStorage) {
    return;
  }

  var form = $(this),
  fields = form.find('input, select, textarea'),
  keyFor = function (field) {
    return form.attr('id') + $(field).attr('name');
  },
  clearFields = function () {
    fields.each(function (index, field) {
      localStorage.removeItem(keyFor(field));
    });
    $('input[type=radio]').each(function(){
      localStorage.removeItem(
        'radio_' + $(this).attr('id')
      );
    });
    localStorage.removeItem('autosaved');
  },
  saveField = function () {
    $(".js-auto-save").text('正在保存...');
    localStorage.setItem(keyFor(this), $(this).val());

    $('input[type=radio]').each(function(){
      localStorage.setItem(
        'radio_' + $(this).attr('id'), JSON.stringify({checked: this.checked})
      );
    });
    setTimeout(function(){
      localStorage.setItem('autosaved', true);
      $('.js-auto-save').text("已保存");
    }, 500);
  },
  recoverField = function (index, field) {
    var value = localStorage.getItem(keyFor(field));
    if (value) {
      $(field).val(value);
    }
    // 处理checkbox
    var state = JSON.parse( localStorage.getItem('radio_'  + $(this).attr('id')) );
    if (state) this.checked = state.checked;
  };

  form.on('submit', clearFields);
  fields.on('change keypress keyup blur', saveField).each(recoverField);
};
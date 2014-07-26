var domRowElement = '<tr>' +
    '   <td><span class="row-index">1</span></td>' +
    '<td><input type="text"/></td>' +
    '<td>' +
    '<input type="button" class="number-subtract" value="-"/>' +
    '<input type="text"/>' +
    '<input type="button" class="number-add" value="+"/>' +
    '   </td>' +
    '<td><input type="button" class="row-delete" value="删除"/></td>' +
    '</tr>';

$(function () {
    $('#row-add').on('click', function () {
        $('#dataRender').append(domRowElement);
        updateRowIndex();
    });
    $('.row-delete').on('click', function () {
        $(this).parent().parent().remove();
        updateRowIndex();
    });
    $('.number-subtract').on('click', function () {
        $(this).next().val(
            ($(this).next().val() ? parseInt($(this).next().val()) : 1) - 1
        );
    });
    $('.number-add').on('click', function () {
        $(this).prev().val(
            ($(this).prev().val() ? parseInt($(this).prev().val()) : 1) + 1
        );
    });
});

function updateRowIndex() {
    $('.row-index').each(function (index) {
        $(this).text(index + 1);
    });
}
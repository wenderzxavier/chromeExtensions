$(function() {
    $('#name').on('input', () => {
        $('#greet').text('Hello ' + $('#name').val())
    })
})
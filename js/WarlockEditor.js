var tileSize = 50;
var activeOptionElement;

$(".tile").draggable({
    containment: '#map',
    appendTo: '#map',
    helper: 'clone',
    snap: true,
    stop: function (e, ui) {
        $(this).draggable().data()['uiDraggable'].cancelHelperRemoval = true;
        var clonedTile = ui.helper[0];
        var tileType = $(clonedTile).data('tile-type');
        var tileSet = $(clonedTile).data('set-name');
        var tileCountElement = $('td[data-tile-type="' + tileType + '"]')[0];
        var newTileCount = parseInt(tileCountElement.innerText) + 1;
        var maxTilePerSet = $(tileCountElement).data('max-count');
        var setCountElement = $('th[data-set-name="' + tileSet + '"]')[0];

        tileCountElement.innerText = newTileCount;

        SetContextMenu(clonedTile);
        $(clonedTile).draggable({
            containment: '#map',
            appendTo: '#map',
            snap: true
        });
    }
});

function SetContextMenu(element) {
    $(element).contextmenu(function (event) {   
        event.preventDefault();

        activeOptionElement = $(event.target);    

        // Show contextmenu
        $("#option-menu").finish().toggle(100).
    
        // In the right position (the mouse)
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });
}
	
$(document).bind("mousedown", function (e) {
    // If the clicked element is not the menu
    if (!$(e.target).parents("#option-menu").length > 0) {
        
        // Hide it
        $("#option-menu").hide(100);
    }
});

function Rotate90() {
    var angle = ($(activeOptionElement).data('angle') + 90) || 90;
    $(activeOptionElement).css({'transform': 'rotate(' + angle + 'deg)'});
    $(activeOptionElement).data('angle', angle);
}

function DeleteActiveTile() {
    $(activeOptionElement).remove();

    $("#option-menu").hide(100);
}

SetContextMenu();
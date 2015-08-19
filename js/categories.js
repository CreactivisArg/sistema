var CTS = CTS || {};

CTS.Categories = {
    init : function () {
        this.bindActions();
        this.getCategories();
    },
    bindActions : function () {
        var self = this;
        // setNewCategory
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewCategory();
        });
    },
    getCategories : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/project/getCategory.php",
            cache: false,
            success: function (list) {
                $('#listPanel').empty();

                for (var i=0;i<list.length;i++) {
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item" onclick="CTS.Categories.editCategory(\'' + list[i].id + '\',\''+list[i].name+'\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editCategory : function (id,name) {
        this.setModalCategory('Edit Category', id, name);
        CTS.Utils.showModal('modalEditCategory');
    },
    setModalCategory : function (title,id,name) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Categories.saveCategory(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Categories.newCategory();">Save changes</button>';
        var category_name = (name) ? '<div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control" value="'+name+'"></div></div>' : '<div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control"></div></div>';

        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditCategory" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +               category_name
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
    },
    saveCategory : function (id) {
        var category = {
                id_category: id,
                name: $("#name").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/updateCategory.php",
            data: JSON.stringify(category),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La categoria fue editada correctamente");
                CTS.Utils.closeModal('modalEditCategory')
                CTS.Categories.getCategories();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewCategory : function () {
        this.setModalCategory('New Category', null, null);
        CTS.Utils.showModal('modalEditCategory');
    },
    newCategory : function () {
        var category = {
                name: $("#name").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/newCategory.php",
            data: JSON.stringify(category),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","La categori fue creada correctamente.");
                CTS.Utils.closeModal('modalEditCategory');
                CTS.Categories.getCategories();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Categories.init();
});
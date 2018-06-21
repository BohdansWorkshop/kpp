$(document).ready(function(){
    $('.list-remove').on('click', function(e){
        $target = $(e.target);
        let id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/task/'+ id,
            success: function(res){
                window.location.href = '/';
            }
        });
    });


    $(".container").click(function(e) {
        $target = $(e.target);
        if($target.is(".edit-icon")) {
            let taskText = $target.prev($(".list-text")).html();
            let id = $target.parent(".list-item").attr("data-id");
            let form = `
                <div class= "edit">
                  <span class="edit-text">${taskText}</span>
                  <input type="text" name="edit" placeholder="Edit task" class="edit__input"/>
                  <button class="edit-btn">Edit</button>
                </div>
            `;

            $target.css("display", "none");

            $(".container").append(form);

            $(".edit-btn").on('click', function() {
                let value = $(this).prev($(".edit__input")).val();
                if(value == ""){
                    value = taskText;
                }
                $.ajax({
                    type: 'POST',
                    url: '/edit/'+ id,
                    data: {
                        value: value,
                    },
                    success: function(res){
                        window.location.href = '/';
                    }
                });
            });


        }

        else if($target.is(".list-text")){
            let id = $target.attr('data-id');
            $.ajax({
                type: 'POST',
                url: '/complete/'+ id,
                success: function(res){
                    window.location.href = '/';
                }
            });
        }
    });
})

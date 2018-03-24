<a href="#upload-avatar" data-toggle="modal">
    <img src="{{ asset($business->avatar) }}" style="width: 100%; -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;" alt="" id="img-show" class="img img-responsive">
</a>
<h4 style="font-weight: bolder;">{{ $business->name }}</h4>
<p>{{ config('content.location.'.$business->address) }}</p>
<p style="word-break: break-all;">{{ $business->abstract }}</p>

<div class="modal fade" tabindex="-1" role="dialog" id="upload-avatar">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">头像上传</h4>
            </div>
            <div class="modal-body">
                <input type="file" class="btn btn-default" id="avatar-upload">
                <div class="img-area"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="img-upload-btn">Save changes</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

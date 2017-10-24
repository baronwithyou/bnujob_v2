@extends('layouts.app')

@section('stylesheets')
@stop

@section('top')
    <section>

    </section>
@stop

@section('content')
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="form-group">
            <a href="javascript:void(0)" id="form-submit" class="btn btn-primary ladda-button" data-style="contract-overlay" data-size="l"><span class="ladda-label">Submit form</span></a>
        </div>
    </div>
</div>
@stop

@section('scripts')
    <script>
        $(function() {
            $('#form-submit').click(function(){
                var l = Ladda.create(this);
                l.start();
                return false;
            });
        });
    </script>
@stop
export const heliosClientJsSnippet=/*html*/`
<script>
(function(w,u,init){
    if(w.heliosEvt){return}
    var h=function(){h._.push(arguments)};
    h._=[];
    h._i_=init;
    h._u=u;
    w.heliosEvt=h;
    var d=w.document;
    var s=d.createElement('script');
    s.async=1;
    s.src=u+'client-sdk/core/client.js';
    d.head.append(s);
})(window,'https://${globalThis.location?.host??'localhost'}/');
</script>
`

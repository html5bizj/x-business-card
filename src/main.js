(function() {
    // Creates an object based in the HTML Element prototype
    var element = Object.create(HTMLElement.prototype);
    
    // Web Componets側のdocument
    var doc = document.currentScript.ownerDocument;

    var me = {
        img: "https://avatars1.githubusercontent.com/u/4105415",
        name: "えんぷら部",
        company: "html5jエンタープライズ部",
        title: "オープンコミュニティ",
        contact: "#html5biz",
        contactUrl: "http://www.html5biz.org/" 
    };
  
    element.fillMe = function(){
        var card = this.shadow;
        
        card.querySelector('.me-image img').src = me.img;
        card.querySelector('.me-name').textContent = me.name;
        card.querySelector('.me-company').textContent = me.company;
        card.querySelector('.me-title').textContent = me.title;
        card.querySelector('.me-contact').textContent = me.contact;
        card.querySelector('.me-contact-url').href = me.contactUrl;

    };
    
    // Fires when an instance of the element is created
    element.createdCallback = function() {
        var template = doc.getElementById('template');
        var card = template.content.cloneNode(true);
        this.shadow = this.createShadowRoot();
        this.shadow.appendChild(card);
        
        var thema = this.getAttribute('thema');
        var me = this.shadowRoot.querySelector('.me');
        if(thema) me.classList.add(thema);
        
        this.addEventListener('click', function (e) {
            var animation = this.getAttribute('animation');
            if(animation){
            me.classList.add(animation);
                setTimeout(function() {
                    me.classList.remove(animation);
                }, 2000);
            }
        });
    };

    // Fires when an instance was inserted into the document
    element.attachedCallback = function() {
        this.fillMe();
    };

    // Fires when an instance was removed from the document
    element.detachedCallback = function() {};

    // Fires when an attribute was added, removed, or updated
    element.attributeChangedCallback = function(attr, oldVal, newVal) {};

    // カスタム要素を登録
    document.registerElement('x-business-card', {
        prototype: element
    });
    
}());
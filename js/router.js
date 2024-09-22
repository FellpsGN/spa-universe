export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
        
        window.history.pushState({}, "", event.target.href)
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        
        fetch(route)
            .then((data) => { return data.text() })
            .then((html) => { document.querySelector("#app").innerHTML = html })
    
        this.setBackground(pathname)
    }

    setBackground(pathname) {
        const body = document.body

        body.classList.remove("fundo-home", "fundo-universe", "fundo-explore")

        switch(pathname) {
            case "/universe":
                body.classList.add("fundo-universe")
                break
            case "/explore":
                body.classList.add("fundo-explore")
                break
            default:
                body.classList.add("fundo-home")
                break
        }
    }
}
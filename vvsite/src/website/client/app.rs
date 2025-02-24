use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/vvsite.css"/>
        <Stylesheet href="/assets/website.css" />

        // sets the document title
        <Title text="Welcome to My Website"/>

        // content for this welcome page
        <Router>
            <header class="flex flex-col h-64 w-screen" style="background-color: rgb(169, 74, 74);">
            <h1 class="p-8 grow place-content-center text-center text-5xl">"My Personal Website"</h1>
            <div class="w-screen flex p-1 justify-center px-30 gap-4" style="background-color: #889E73DD">
                <a class="text-lg p-4 hover:bg-[#889E73ff] rounded-md" href="/">"Home"</a>
                <a class="text-lg p-4 hover:bg-[#889E73ff] rounded-md" href="/minishell">"Minishell"</a>
                <a class="text-lg p-4 hover:bg-[#889E73ff] rounded-md" href="/minirt">"MiniRT"</a>
                <a class="text-lg p-4 hover:bg-[#889E73ff] rounded-md" href="/emiku">"emiku"</a>
            </div>
            </header>
            <main>
            <div class="flex h-screen w-screen max-w-[1300px] m-auto p-4">
                <Routes>
                    <Route path="" view=crate::website::client::home::HomePage/>
                    <Route path="/minishell" view=crate::website::client::minishell::MinishellPage/>
                    <Route path="/emiku" view=crate::website::client::emiku::EmikuPage/>
                    <Route path="/*any" view=NotFound/>
                </Routes>
            </div>
            </main>
        </Router>
    }
}

/// 404 - Not Found
#[component]
fn NotFound() -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>();
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! {
        <h1>"Not Found"</h1>
    }
}

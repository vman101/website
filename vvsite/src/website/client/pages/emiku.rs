use leptos::*;

#[component]
pub fn EmikuPage() -> impl IntoView {
    view! {
        <div class="flex flex-col w-full box-border">
            <div class="flex h-[8vh] place-content-stretch">
                <h2 class="text-4xl py-8">"The Emiku Database Manager"</h2>
            </div>
            <iframe src="http://127.0.0.1:8080" class="w-full h-full box-border min-w-[50vw] max-w-[100vw] min-h-[40vh] max-h-[70vh]" />
        </div>
    }
}

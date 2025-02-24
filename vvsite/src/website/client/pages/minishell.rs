use leptos::*;

#[component]
pub fn MinishellPage() -> impl IntoView{

    view! {
        <div class="flex flex-col w-full box-border">
            <div class="flex h-[8vh] place-content-stretch">
                <h2 class="text-4xl py-8">"The (mini) Shell"</h2>
            </div>
            <iframe src="https://remoteserver.vps.webdock.cloud/minishell/vnc" class="place-self-center" width="800" height="600" />
        </div>
    }
}

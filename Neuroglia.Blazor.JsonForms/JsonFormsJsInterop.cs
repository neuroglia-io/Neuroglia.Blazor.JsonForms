using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Neuroglia.Blazor.JsonForms;

/// <summary>
/// The service used to build a bridge with the JSON Forms web component
/// </summary>
public class JsonFormsJsInterop 
    : IAsyncDisposable
{
    /// <summary>
    /// A reference to the js interop module
    /// </summary>
    private readonly Lazy<Task<IJSObjectReference>> moduleTask;

    /// <summary>
    /// Constructs a new <see cref="JsonFormsJsInterop"/>
    /// </summary>
    /// <param name="jsRuntime">The service used to interop with JS</param>
    public JsonFormsJsInterop(IJSRuntime jsRuntime)
    {
        moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/Neuroglia.Blazor.JsonForms/js/jsonforms-js-interop.js").AsTask());
    }

    public async ValueTask<IJSObjectReference> BindWebComponentAsync(ElementReference domElement, DotNetObjectReference<JsonForm>? dotnetReference, JsonFormInputs inputs)
    {
        var module = await moduleTask.Value;
        return await module.InvokeAsync<IJSObjectReference>("init", domElement, dotnetReference, inputs);
    }

    public async ValueTask DisposeAsync()
    {
        if (moduleTask.IsValueCreated)
        {
            var module = await moduleTask.Value;
            await module.DisposeAsync();
        }
    }
}
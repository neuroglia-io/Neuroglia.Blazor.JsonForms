namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface DispatchPropsOfMultiEnumControl
    {
        [System.Text.Json.Serialization.JsonPropertyName("addItem")]
        System.Action<string, object> AddItem { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("removeItem")]
        System.Action<string, object>? RemoveItem { get; set; }

    }
}


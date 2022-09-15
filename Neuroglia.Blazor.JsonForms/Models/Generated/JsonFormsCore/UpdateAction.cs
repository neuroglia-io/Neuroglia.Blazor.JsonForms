namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface UpdateAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("path")]
        string Path { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        object Updater(object existingData);

    }
}


namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface UpdateErrorsAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("errors")]
        ErrorObject<string, Record<string, object>, object>[] Errors { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}


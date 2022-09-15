namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface StatePropsOfMasterItem : OwnPropsOfMasterListItem
    {
        [System.Text.Json.Serialization.JsonPropertyName("childLabel")]
        string ChildLabel { get; set; }

    }
}


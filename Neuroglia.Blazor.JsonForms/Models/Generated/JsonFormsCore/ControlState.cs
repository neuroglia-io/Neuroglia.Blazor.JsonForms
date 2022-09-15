namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// The state of a control.
    /// </summary>
    interface ControlState
    {
        /// <summary>
        /// Whether the control is focused.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("isFocused")]
        bool IsFocused { get; set; }

        /// <summary>
        /// The current value.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("value")]
        object Value { get; set; }

    }
}


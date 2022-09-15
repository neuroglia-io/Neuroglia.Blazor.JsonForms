namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// A rule that may be attached to any UI schema element.
    /// </summary>
    interface Rule
    {
        /// <summary>
        /// The condition of the rule that must evaluate to true in order
        /// to trigger the effect.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("condition")]
        Condition Condition { get; set; }

        /// <summary>
        /// The effect of the rule
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("effect")]
        RuleEffect Effect { get; set; }

    }
}


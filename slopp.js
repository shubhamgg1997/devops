// JavaScript source code
/* Date: 25-Feb-2025
  Created By: Hanumantha */

"use strict";

var RSA = window.RSA || { __namespace: true, __typeName: "RSA" };
RSA.D365CRM = RSA.D365CRM || { __namespace: true, __typeName: "RSA.D365CRM" };
RSA.D365CRM.SLOpportunity = RSA.D365CRM.SLOpportunity || { __namespace: true, __typeName: "RSA.D365CRM.SLOpportunity" };
RSA.D365CRM.SLOpportunity.Main = RSA.D365CRM.SLOpportunity.Main || ({
    FormType: {
        Create: 1,
        Update: 2,
        ReadOnly: 3,
        Disabled: 4,
        BulkEdit: 6
    },
    OnLoad: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var defaultStageOptions;
        var stageCtrl = formContext.getControl("rsa_opportunitystage");
        if (!defaultStageOptions && stageCtrl) {
            defaultStageOptions = stageCtrl.getOptions().map(function (o) {
                return { value: o.value, text: o.text };
            });
        }
        RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields(executionContext);
        RSA.D365CRM.SLOpportunity.Main.filterOpportunityStage(formContext, defaultStageOptions);
        RSA.D365CRM.SLOpportunity.Main.filterSLOpportunityStage(formContext);
        var recordTypeAttr = formContext.getAttribute("rsa_recordtype");
        if (recordTypeAttr) {
            var RecordType = recordTypeAttr.getValue();
            if (RecordType != null) {
                RSA.D365CRM.SLOpportunity.Main.lockBpfRecordTypeOnSave(executionContext);
            }
            recordTypeAttr.addOnChange(function () {
                //formContext.getAttribute("rsa_opportunitystage").setValue(null);
                RSA.D365CRM.SLOpportunity.Main.filterOpportunityStage(formContext);
                RSA.D365CRM.SLOpportunity.Main.filterSLOpportunityStage(formContext);
            });
        }

        //RSA.D365CRM.SLOpportunity.Main.AddingTooltip(executionContext);
        if (formContext.ui.getFormType() === RSA.D365CRM.SLOpportunity.Main.FormType.Create) {
            // RSA.D365CRM.SLOpportunity.Main.Lock(executionContext);            
        }
        else if (formContext.ui.getFormType() === RSA.D365CRM.SLOpportunity.Main.FormType.Update) {
            //RSA.D365CRM.SLOpportunity.Main.Lock(executionContext);            
        }
        else if (formContext.ui.getFormType() === RSA.D365CRM.SLOpportunity.Main.FormType.Disabled) {
            //RSA.D365CRM.SLOpportunity.Main.Lock(executionContext);
        }
        else if (formContext.ui.getFormType() === RSA.D365CRM.SLOpportunity.Main.FormType.BulkEdit) {
            // RSA.D365CRM.SLOpportunity.Main.Lock(executionContext);
        }
        if (formContext.getAttribute("rsa_estimatedsigningpercentage").getValue() === null) {
            formContext.getAttribute("rsa_estimatedsigningpercentage").setValue(100);
        }
        RSA.D365CRM.SLOpportunity.Main.SetPolicyLength(executionContext);
        RSA.D365CRM.SLOpportunity.Main.hideShowPolicy(executionContext);
        RSA.D365CRM.SLOpportunity.Main.hideShowCyTriField(executionContext);
        
        formContext.getAttribute("rsa_customertype").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowLargeCorporate);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ProfitShareFieldShowHide);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.ProfitShareFieldShowHide);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.ProfitShareFieldShowHide);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidewicfinancefields);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidewicfinancefields);




        // OnChange
        formContext.getAttribute("rsa_opportunitystage")
            .addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideCommissionWorkTransferIsbFields);

        //formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.BaseCommissionPercentFieldShowHide);

        //formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.ISBPercentFieldShowHide);
        //formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ISBPercentFieldShowHide);

        //formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.WorkTransferFeePercentFieldShowHide);
        //formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.WorkTransferFeePercentFieldShowHide);
        //formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.WorkTransferFeePercentFieldShowHide);
        //formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.WorkTransferFeePercentFieldShowHide);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.PLTotalMarineValidation);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.TotalMarineAndGBMWIPFieldValidation);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.TotalMarineAndGBMWIPFieldValidation);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.TotalMarineAndGBMWIPFieldValidation);

        //formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.TerritorialExposureEqualsComplexMultinational);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.EstimatedsigningpercentageShowHide);

        formContext.getAttribute("rsa_policystartdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.DateTermsRequiredByBrokerCustomerValidation);

        formContext.getAttribute("rsa_policystartdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.PolicyStartDateValidation);
        formContext.getAttribute("rsa_policystartdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.SetPolicyLength);

        formContext.getAttribute("rsa_policyexpirydate").addOnChange(RSA.D365CRM.SLOpportunity.Main.PolicyEndDateValidation);
        formContext.getAttribute("rsa_policyexpirydate").addOnChange(RSA.D365CRM.SLOpportunity.Main.SetPolicyLength);

        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidePOLSection);
        formContext.getAttribute("rsa_cover").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidePOLSection);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideAandHTab);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideMarineTab);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideMarineTab);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideEandRETab);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideRMUKPropertyTab);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideRMUKPropertyTab);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideLiabilityTab);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidewicSection);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHidewicSection);

        //As per COMDYN-1899 we do not need this tab to be visible
        //formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideMultinationalTab);

        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideRealEstateTab);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideRealEstateTab);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.ShowHideSuretyTab);



        formContext.getAttribute("rsa_fasttrack").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_papremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_businesstravelpremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_holidaytravelpremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_illnesstravelpremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_fasttracklastreviewdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        formContext.getAttribute("rsa_fasttracknextreviewdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);

        formContext.getAttribute("rsa_fasttracklastreviewdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.SetNextReviewDateValue);

        formContext.getAttribute("rsa_annualproject").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_uwrationale").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_coverspreadsheetupdated").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_cover").addOnChange(RSA.D365CRM.SLOpportunity.Main.requireProjectTypeBasedOnEar);
         formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.requireProjectTypeBasedOnEar);
          formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.requireProjectTypeBasedOnEar);
        formContext.getAttribute("rsa_exposuresapplicable").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_exposurecountry").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_sourcearea").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_synergybranch").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_sourcecountry").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_classification").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_methodofplacementsynergy").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_risk").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_usstate").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);

        formContext.getAttribute("rsa_oarorconstruction").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_coalexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_gasexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_oilexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_dieselexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_solarexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_hydroexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_geothermalexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_windexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_otherexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_bioexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_bessexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);

        formContext.getAttribute("rsa_howarewenotifiedabouttheclaim").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKPropertyFieldsMandatoryCheck);
        formContext.getAttribute("rsa_otherclaimtype").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKPropertyFieldsMandatoryCheck);

        formContext.getAttribute("rsa_isthereanyusexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKLiabilityFieldsMandatoryCheck);
        formContext.getAttribute("rsa_usexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKLiabilityFieldsMandatoryCheck);


        formContext.getAttribute("rsa_legaltitlecompanytype").addOnChange(RSA.D365CRM.SLOpportunity.Main.LegalTileFieldMandatoryCheck);
        formContext.getAttribute("rsa_whatistheirlegaltitle").addOnChange(RSA.D365CRM.SLOpportunity.Main.LegalTileFieldMandatoryCheck);


        formContext.getAttribute("rsa_cypolrsashare").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_poltri").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);

        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKLiabilityFieldsMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.TotalMarineAndGBMWIPFieldValidation);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.RMUKPropertyFieldsMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck);
        //formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.RealEstateFieldsMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);

        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.SetProductFieldValue);
        formContext.getAttribute("rsa_typeofcontact").addOnChange(RSA.D365CRM.SLOpportunity.Main.SetDomicileOfCountryMandatory);


        RSA.D365CRM.SLOpportunity.Main.LegalTileFieldMandatoryCheck(executionContext);

        RSA.D365CRM.SLOpportunity.Main.SetNextReviewDateValue(executionContext);
        RSA.D365CRM.SLOpportunity.Main.FilterCoverOptionSetVAluesBasedOnGBMOnLoad(executionContext);
        RSA.D365CRM.SLOpportunity.Main.enableOptionsBasedOnSelection();
        RSA.D365CRM.SLOpportunity.Main.ShowNotificationOnOpportunity(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideWIPTab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowLargeCorporate(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideAandHTab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideMarineTab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideEandRETab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideRMUKPropertyTab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHideRealEstateTab(executionContext);

        RSA.D365CRM.SLOpportunity.Main.ShowHideLiabilityTab(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHidewicSection(executionContext);
        //As per COMDYN-1899 we do not need this tab to be visible
        // RSA.D365CRM.SLOpportunity.Main.ShowHideMultinationalTab(executionContext);

        RSA.D365CRM.SLOpportunity.Main.ShowHideSuretyTab(executionContext);

        //Mandatory functions
        RSA.D365CRM.SLOpportunity.Main.AnHFieldsMandatoryCheck(executionContext);
        RSA.D365CRM.SLOpportunity.Main.MarineFieldsMandatoryCheck(executionContext);
        RSA.D365CRM.SLOpportunity.Main.EnREFieldsMandatoryCheck(executionContext);
        RSA.D365CRM.SLOpportunity.Main.RMUKPropertyFieldsMandatoryCheck(executionContext);
        RSA.D365CRM.SLOpportunity.Main.RMUKLiabilityFieldsMandatoryCheck(executionContext);

        RSA.D365CRM.SLOpportunity.Main.ShowHidewicfinancefields(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ProfitShareFieldShowHide(executionContext);
        // RSA.D365CRM.SLOpportunity.Main.BaseCommissionPercentFieldShowHide(executionContext);
        //RSA.D365CRM.SLOpportunity.Main.ISBPercentFieldShowHide(executionContext);
        // RSA.D365CRM.SLOpportunity.Main.WorkTransferFeePercentFieldShowHide(executionContext);
        RSA.D365CRM.SLOpportunity.Main.PLTotalMarineValidation(executionContext);
        RSA.D365CRM.SLOpportunity.Main.TotalMarineAndGBMWIPFieldValidation(executionContext);
        // RSA.D365CRM.SLOpportunity.Main.TerritorialExposureEqualsComplexMultinational(executionContext);
        RSA.D365CRM.SLOpportunity.Main.EstimatedsigningpercentageShowHide(executionContext);
        RSA.D365CRM.SLOpportunity.Main.DateTermsRequiredByBrokerCustomerValidation(executionContext);
        RSA.D365CRM.SLOpportunity.Main.ShowHidePOLSection(executionContext);
        //Fields Mandatory at alternative stage 3
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree(executionContext);
        formContext.getAttribute("rsa_doyouknowthefinalpremiumdp").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_finalquotedprice100pc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_quotedlinesize").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_outcomeleadinsurerlookup").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_outcomereasonid").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        formContext.getAttribute("rsa_100boundpremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtAlternativeStageThree);
        //Fields Mandatory at stage 1
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne(executionContext);
        formContext.getAttribute("rsa_customer").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_brokername").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_customertype").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_customertype").addOnChange(RSA.D365CRM.SLOpportunity.Main.CompaniesHouseRefNumberFieldMandatoryCheck);
        formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").addOnChange(RSA.D365CRM.SLOpportunity.Main.CompaniesHouseRefNumberFieldMandatoryCheck);
        formContext.getAttribute("rsa_datequotereceived").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        //formContext.getAttribute("rsa_largecorporateriskexemptioncriteriamet").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_policylength").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_policyexpirydate").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_policystartdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_underwritertrader").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        formContext.getAttribute("rsa_londonregionslloyds").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne);
        //Fields Mandatory at stage 2
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo(executionContext);

        //formContext.getAttribute("rsa_cytri").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_cyorder").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_basecommissionpercent").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_basecommissionpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_cygwp100exgrossupsandterrorismpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_cygwp100exgrossupsandterrorismpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
        formContext.getAttribute("rsa_cyrsashare").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
        formContext.getAttribute("rsa_cyorder").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
        formContext.getAttribute("rsa_estimatedsigningpercentage").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
        formContext.getAttribute("rsa_cyrsawritten").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
		formContext.getAttribute("rsa_cycaptivepremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
		formContext.getAttribute("rsa_cypolgwp100exgrossupsandterrorismpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);
		formContext.getAttribute("rsa_cypolrsashare").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateBackGroundFieldForGrpShare);

        formContext.getAttribute("rsa_cygwprsasharebackgroundfield").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);


        formContext.getAttribute("rsa_datetermsissuedtobrokercustomer").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_distributionmethod").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_fullvalueprimaryxolquotashare").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_insuredscountryofdomicile").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_macquariepolicy").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_methodofplacement").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);

        formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_typeofcontact").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_whatistheirtradelookup").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_brokerpresentationchannel").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_datetermsrequiredbybrokercustomer").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);
        formContext.getAttribute("rsa_distribution").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo);



        //Fields Mandatory at stage 3
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree(executionContext);
        formContext.getAttribute("rsa_policycurrency").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        //formContext.getAttribute("rsa_policy").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_whatistheirlegaltitle").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);

        formContext.getAttribute("rsa_aggregatelimitpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_isatpahandlingwithintheselfinsuredorcapti").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_isb").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_worktransferfeeip").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_caseexchangerate").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_feesadditionaltopremiumgsl1").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_riskengineeringfee").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_riskmanagementbursarypc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_technicalpremiumpc100").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_isbpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_rsaexternalreinsuranceinclpanelpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_cyfacri").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_leadofficeoverriderpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_servicingofficeoverriderpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        // formContext.getAttribute("rsa_worktransferfeepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_quotecontractcertainty").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_leadfollow").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_longtermagreement").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_manufacturingstatus").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        //formContext.getAttribute("rsa_methodofpayment").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_name").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        //formContext.getAttribute("rsa_policysystemcode").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_wordingtype").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_cycaptivepremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_captivedeductiblepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_captiveaggregatelimitpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_captivecontact").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_captivedeductiblefrontedornonfronted").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_nonrankingdeductiblepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_rankingdeductiblepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_nonrankingdeductibleinclusiveorexclusiveo").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_continuingdeductiblepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_deductiblefrontedornonfronted").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_aggregatelimitpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_nameoftpa").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_contactattpa").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_ukclaimshandlingonly").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_referraltorsa").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_evidenceofcovereocreasonforfailure").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_leadinsurers").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_productname").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_ltastatus").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_policycontractcertainty").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_cover").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_stampsapplicable").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_cyrsawritten").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_cypolgwp100exgrossupsandterrorismpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree);
        formContext.getAttribute("rsa_brokertargetpremiumpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.supportflagFieldValidation);
        formContext.getAttribute("rsa_reasonableadjustmentdetail").addOnChange(RSA.D365CRM.SLOpportunity.Main.supportflagFieldValidation);


        RSA.D365CRM.SLOpportunity.Main.CertaintyReasonFieldMandatoryCheck(executionContext);

        formContext.getAttribute("rsa_policystartdate").addOnChange(RSA.D365CRM.SLOpportunity.Main.CertaintyReasonFieldMandatoryCheck);
        formContext.getAttribute("rsa_quotecontractcertainty").addOnChange(RSA.D365CRM.SLOpportunity.Main.CertaintyReasonFieldMandatoryCheck);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.CertaintyReasonFieldMandatoryCheck);
        formContext.getAttribute("rsa_leadfollow").addOnChange(RSA.D365CRM.SLOpportunity.Main.CertaintyReasonFieldMandatoryCheck);

        RSA.D365CRM.SLOpportunity.Main.ProgCurrencyMandatory(executionContext);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.ProgCurrencyMandatory);

        RSA.D365CRM.SLOpportunity.Main.IssuedMandatory(executionContext);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.IssuedMandatory);

        RSA.D365CRM.SLOpportunity.Main.supportflagFieldValidation(executionContext);

        formContext.getAttribute("rsa_siccodedescription").addOnChange(RSA.D365CRM.SLOpportunity.Main.TradeFieldMandatoryCheck);
        formContext.getAttribute("rsa_whatistheirtradelookup").addOnChange(RSA.D365CRM.SLOpportunity.Main.TradeFieldMandatoryCheck);
        formContext.getAttribute("rsa_customertype").addOnChange(RSA.D365CRM.SLOpportunity.Main.TradeFieldMandatoryCheck);

        RSA.D365CRM.SLOpportunity.Main.TradeFieldMandatoryCheck(executionContext);
        RSA.D365CRM.SLOpportunity.Main.NAICSCodefieldmandatory(executionContext);
        formContext.getAttribute("rsa_customer").addOnChange(RSA.D365CRM.SLOpportunity.Main.NAICSCodefieldmandatory);
        formContext.getAttribute("rsa_insuredscountryofdomicile").addOnChange(RSA.D365CRM.SLOpportunity.Main.NAICSCodefieldmandatory);

        //formContext.getAttribute("rsa_policy").addOnChange(RSA.D365CRM.SLOpportunity.Main.FilterPolicyAdminSystemCode);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.FilterPolicyAdminSystemCode);
        formContext.getAttribute("rsa_pl").addOnChange(RSA.D365CRM.SLOpportunity.Main.FilterPolicyAdminSystemCode);
        RSA.D365CRM.SLOpportunity.Main.FilterPolicyAdminSystemCode(executionContext);

        RSA.D365CRM.SLOpportunity.Main.YachtFieldsMandatoryCheck(executionContext);
        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.YachtFieldsMandatoryCheck);
        formContext.getAttribute("rsa_gbm").addOnChange(RSA.D365CRM.SLOpportunity.Main.YachtFieldsMandatoryCheck);

        //AddingTooltip
        RSA.D365CRM.SLOpportunity.Main.AddingTooltip(executionContext);
        formContext.getAttribute("rsa_territorialexposure").addOnChange(RSA.D365CRM.SLOpportunity.Main.AddingTooltip);

        formContext.getAttribute("rsa_basecommissionpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);
        formContext.getAttribute("rsa_worktransferfeepc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);
        formContext.getAttribute("rsa_isbpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);

        //COMDYN-2308
        formContext.getAttribute("rsa_basecommissionpercent").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);
        formContext.getAttribute("rsa_worktransferfeeip").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);
        formContext.getAttribute("rsa_isb").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);
        formContext.getAttribute("rsa_cygwprsashareexgrossupsandterrorismpc").addOnChange(RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields);

        //COMDYN-1508
        ["rsa_coalexposure", "rsa_gasexposure", "rsa_oilexposure", "rsa_dieselexposure",
            "rsa_solarexposure", "rsa_hydroexposure", "rsa_geothermalexposure", "rsa_windexposure",
            "rsa_otherexposure", "rsa_bioexposure", "rsa_bessexposure"]
            .forEach(function (name) {
                formContext.getAttribute(name).addOnChange(RSA.D365CRM.SLOpportunity.Main.TotalEnREExposureValidator);
            });

        RSA.D365CRM.SLOpportunity.Main.TotalEnREExposureValidator(executionContext)

        formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.hideShowPolicy);
         formContext.getAttribute("rsa_opportunitystage").addOnChange(RSA.D365CRM.SLOpportunity.Main.hideShowCyTriField);
        
        RSA.D365CRM.SLOpportunity.Main.ShowHideCommissionWorkTransferIsbFields(executionContext);
        formContext.getAttribute("rsa_policycurrency").addOnChange(RSA.D365CRM.SLOpportunity.Main.makeCYExchangeRateBlank);

    },
    OnSave: function (executionContext) {
        var formContext = executionContext.getFormContext();
       // RSA.D365CRM.SLOpportunity.Main.CalculateCommisionFields(executionContext);
       // RSA.D365CRM.SLOpportunity.Main.showCreatePolicyPopUp(executionContext);
       // RSA.D365CRM.SLOpportunity.Main.lockBpfRecordTypeOnSave(executionContext);
       // RSA.D365CRM.SLOpportunity.Main.makeCYExchangeRateBlank(executionContext);

    },
    /*  OnSave: function (executionContext) {
  
          // RSA.D365CRM.SLOpportunity.Main.FilterCoverOptionSetVAluesBasedOnGBM(executionContext);
          RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageThree(executionContext);
          
  
          // COMDYN-1508 - NEW: hard stop save if exposures != 100
          RSA.D365CRM.SLOpportunity.Main.TotalEnREExposureValidator(executionContext, { blockIfInvalid: true });
      },*/

    ShowHideWIPTab: function (executionContext) {

        var formContext = executionContext.getFormContext();
        if (formContext.getAttribute("rsa_pl").getValue() !== null && formContext.getAttribute("rsa_gbm").getValue() !== null) {
            var pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            var gbm = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            if (pl === "Property" && gbm === "International Wholesale") {
                formContext.ui.tabs.get("WIP Financials").setVisible(true);
            }
            else {
                formContext.ui.tabs.get("WIP Financials").setVisible(false);
            }

        }
    },

    //Always visible except when GBM is International Wholesale or P&L is Risk Managed UK Liability and Distribution is Wholesale Broker/Partner
    ProfitShareFieldShowHide: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var GBM, PL, Distribution;
        var IsVisible = true;
        var SetNullValue = false;
        var controlArray = ['rsa_profitshare'];

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                PL = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {
            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }

        if (GBM === "International Wholesale" || (PL === "SL Casualty" && Distribution === "Wholesale Broker/Partner") || PL === "Marine") {
            IsVisible = false;
            SetNullValue = true;
        }

        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, SetNullValue);
    },
    //Always visible except when Territorial Exposure selected as Complex Multinational
    BaseCommissionPercentFieldShowHide: function (executionContext) {
        ////debugger;
        var formContext = executionContext.getFormContext();
        var territorialExposure;
        var IsVisible = true;
        var controlArray = ['rsa_basecommissionpercent', 'rsa_basecommissionpc'];

        if (formContext.getAttribute("rsa_territorialexposure") !== null && formContext.getAttribute("rsa_territorialexposure") !== "undefined") {

            if (formContext.getAttribute("rsa_territorialexposure").getValue() !== null) {
                territorialExposure = formContext.getAttribute("rsa_territorialexposure").getText();
            }
            if (territorialExposure !== null && territorialExposure !== undefined) {
                if (territorialExposure.includes("Complex Multinational")) {
                    // //IsVisible = false;
                    // formContext.getControl("rsa_basecommissionpercent").setVisible(false);//rsa_basecommission
                    // formContext.getControl("rsa_basecommission").setVisible(false);
                    // formContext.getAttribute("rsa_basecommissionpercent").setValue(null);
                }
                else {
                    // formContext.getControl("rsa_basecommissionpercent").setVisible(true);
                    // formContext.getControl("rsa_basecommission").setVisible(true);
                }
            }
            else {
                // formContext.getControl("rsa_basecommissionpercent").setVisible(true);
                // formContext.getControl("rsa_basecommission").setVisible(true);
            }
        }
        //RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, true);
    },
    //Always visible except when Territorial Exposure selected as Complex Multinational, or where P& L is Marine
    ISBPercentFieldShowHide: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var territorialExposure, PL;
        var IsVisible = true;
        var SetNullValue = false;
        var controlArray = ['rsa_isb', 'rsa_isbpc'];

        if (formContext.getAttribute("rsa_territorialexposure") !== null && formContext.getAttribute("rsa_territorialexposure") !== "undefined") {
            if (formContext.getAttribute("rsa_territorialexposure").getValue() !== null) {
                territorialExposure = formContext.getAttribute("rsa_territorialexposure").getText();
            }
        }
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {

            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                PL = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (PL === "Marine") {
            IsVisible = false;
            SetNullValue = true;
        }
        else if (territorialExposure !== null && territorialExposure !== undefined) {
        }

        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, SetNullValue);
    },
    //Always visible except when (Territorial Exposure selected as Complex Multinational or where P&L is Marine or GBM is International Wholesale 
    //or P& L is Risk Managed UK Liability and Distribution is Wholesale Broker / Partner
    WorkTransferFeePercentFieldShowHide: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var territorialExposure, PL, GBM, Distribution;
        var IsVisible = true;
        var setNullValue = false;
        var controlArray = ['rsa_worktransferfeeip', 'rsa_worktransferfeepc'];

        if (formContext.getAttribute("rsa_territorialexposure") !== null && formContext.getAttribute("rsa_territorialexposure") !== "undefined") {
            if (formContext.getAttribute("rsa_territorialexposure").getValue() !== null) {
                territorialExposure = formContext.getAttribute("rsa_territorialexposure").getText();
            }
        }
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                PL = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {

            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }

        if (PL === "Marine" || GBM === "International Wholesale" || (PL === "SL Casualty" && Distribution === "Wholesale Broker/Partner")) {
            IsVisible = false;
            setNullValue = true;
        }
        else if (territorialExposure !== null && territorialExposure !== undefined) {

        }

        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, setNullValue);
    },

    isExposureComplexOrAll: function (formContext) {
        var IsMandatory;
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage == "Quoted" || OptStage == "Accepted") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false
        }
        return IsMandatory;


    },



    ShowHideCommissionWorkTransferIsbFields: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var shouldShow = RSA.D365CRM.SLOpportunity.Main.isExposureComplexOrAll(formContext);

        var fields = [
            "rsa_basecommissionpercent",
            "rsa_basecommissionpc",
            "rsa_worktransferfeeip",
            "rsa_worktransferfeepc",
            "rsa_isb",
            "rsa_isbpc"
        ];

        fields.forEach(function (name) {
            var ctrl = formContext.getControl(name);
            var attr = formContext.getAttribute(name);
            if (ctrl) ctrl.setVisible(shouldShow);
            if (attr) attr.setRequiredLevel(shouldShow ? "required" : "none")
        });
    },


    //Always visible except where P& L is Marine or Group PA & Business Travel
    PLTotalMarineValidation: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl;
        var IsVisible = true;
        var SetNullValue = false;
        var controlArray = ['rsa_cyterrorismpremiumgross100ptcpc', 'rsa_cyterrorismgrosspremiumpcrsashare', 'rsa_cyterrorismcommissionpctrsashare', 'rsa_cyterrorismcommissionamountpcrsashare', 'rsa_cyterroorismnetpremiumpcrsashare'];

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {

            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }

            if (pl === "Marine" || pl === "Group PA & Business Travel") {
                IsVisible = false;
                SetNullValue = true;
            }
        }
        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, SetNullValue);
    },
    //Always visible except where (P&L is Marine) or (GBM is International Wholesale)
    //or(P&L is Risk Managed UK Liability and Distribution is Wholesale Broker/ Partner)
    TotalMarineAndGBMWIPFieldValidation: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, GBM, Distribution;
        var IsVisible = true;
        var SetNullValue = false;
        var arrIds = ['rsa_cycaptivepremiumpc', 'rsa_cyinternalreinsurancepc', 'rsa_cycoinsurancecoreinsurancepc', 'rsa_cycoinsurancecoreinsurance', 'rsa_cygwpinclfrontingpc', 'rsa_profitsharepc', 'rsa_profitshare'];

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {

            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }
        if (pl === "Marine" || GBM === "International Wholesale" || (pl === "SL Casualty" && Distribution === "Wholesale Broker/Partner")) {
            IsVisible = false;
            SetNullValue = true;
        }
        if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
            var opportunitystage = formContext.getAttribute("rsa_opportunitystage").getText();
            if ((pl !== "Marine" || GBM !== "International Wholesale") && opportunitystage === "Accepted" || opportunitystage === "Renewal Work-Up") {
                formContext.getAttribute("rsa_cyinternalreinsurancepc").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_cyinternalreinsurancepc").setRequiredLevel("none");
            }
        }


        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, arrIds, IsVisible, SetNullValue);
    },


    //Only visible when Territorial Exposure selected as Complex Multinational
    TerritorialExposureEqualsComplexMultinational: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var territorialExposure;
        var IsVisible = false;
        var setNullValue = true;
        var controlArray = ['rsa_basecommissionpc', 'rsa_worktransferfeepc', 'rsa_isbpc'];

        if (formContext.getAttribute("rsa_territorialexposure") !== null && formContext.getAttribute("rsa_territorialexposure") !== "undefined") {

            if (formContext.getAttribute("rsa_territorialexposure").getValue() !== null) {
                territorialExposure = formContext.getAttribute("rsa_territorialexposure").getText();
            }

            if (territorialExposure !== null && territorialExposure !== undefined) {

            }
        }
        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, setNullValue);
    },

    //-Only visible where P&L is Marine; default to 100%
    EstimatedsigningpercentageShowHide: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl;
        var IsVisible = false;
        var controlArray = ['rsa_estimatedsigningpercentage'];

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {

            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }

            if (pl === "Marine") {
                IsVisible = true;
            }
        }
        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, false);
    },

    ClearGBMValueOnPLOnChange: function (executionContext) {
        var formContext = executionContext.getFormContext();
        //  if (formContext.getAttribute("rsa_pl").getValue() !== null) {            
        formContext.getAttribute("rsa_gbm").setValue(null);
        //   }
    },

    // Author : Hanumantha
    // Date_Created : 25 Feb 2025
    // This function is to filter the Cover option set values based on GBM lookup field selection.
    FilterCoverOptionSetVAluesBasedOnGBM: function (executionContext) {
        try {

            var formContext = executionContext.getFormContext();
            if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined" && formContext.getAttribute("rsa_cover") !== null && formContext.getAttribute("rsa_cover") !== "undefined") {
                var PL, GBM, coverOptionSetValues, covervalue;
                //if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                //    PL = formContext.getAttribute("rsa_pl").getValue()[0].name;
                //}

                if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                    GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;



                    // coverOptionSetValues = formContext.getControl("rsa_cover").getOptions();

                    var optPropertyDamage = { value: 866760000, text: "Property Damage" };
                    var optBusinessInterruption = { value: 866760001, text: "Business Interruption" };
                    var optTerrorism = { value: 866760002, text: "Terrorism" };
                    var optPropertyOwners = { value: 866760003, text: "Property Owners" };
                    var optPropertyOwnersLiability = { value: 866760004, text: "Property Owners Liability" };
                    var optContractWorks = { value: 866760005, text: "Contract Works" };
                    var optEL = { value: 866760006, text: "EL" };
                    var optEAR = { value: 866760007, text: "EAR" };
                    var optOtherEngineering = { value: 866760008, text: "Other Engineering" };
                    var optConventionalPower = { value: 866760009, text: "Conventional Power" };
                    var optRenewableenergy = { value: 866760010, text: "Renewable energy" };
                    var optPL = { value: 866760011, text: "PL" };
                    var optProducts = { value: 866760012, text: "Products" };
                    var optEIL = { value: 866760013, text: "EIL" };
                    var optPersonalAccident = { value: 866760014, text: "Personal Accident" };
                    var optBusinessTravel = { value: 866760015, text: "Business Travel" };
                    var optIllness = { value: 866760016, text: "Illness" };
                    var optPAwhiletravelling = { value: 866760017, text: "PA while travelling" };
                    var optStock = { value: 866760018, text: "Stock" };
                    var optTransit = { value: 866760019, text: "Transit" };
                    var optProject = { value: 866760020, text: "Project" };
                    var optDSU = { value: 866760021, text: "DSU" };
                    var optWar = { value: 866760022, text: "War" };
                    var optExcess = { value: 866760023, text: "Excess" };
                    var optHM = { value: 866760024, text: "H&M" };
                    var optIV = { value: 866760025, text: "IV" };
                    var optLossofHire = { value: 866760026, text: "Loss of Hire" };
                    var optMIIMAP = { value: 866760027, text: "MII / MAP" };
                    var optBuildersRisk = { value: 866760028, text: "Builder's Risk" };
                    var optYardProperty = { value: 866760029, text: "Yard Property" };
                    var optSRL = { value: 866760030, text: "SRL" };
                    var optTerminalOperatorsLiability = { value: 866760031, text: "Terminal Operator's Liability" };
                    var optMarineEL = { value: 866760032, text: "Marine EL" };
                    var optMarineGL = { value: 866760033, text: "Marine GL" };
                    var optConstruction = { value: 866760034, text: "Construction" };
                    //  var optEIL = { value: 866760035, text: "EIL" };
                    var optWarranty = { value: 866760036, text: "Warranty" };
                    var optIGPI = { value: 866760037, text: "IG P&I" };
                    var optIGNonPooledRisk = { value: 866760038, text: "IG Non-Pooled Risk" };
                    var optFixedPremiumPI = { value: 866760039, text: "Fixed Premium P&I" };
                    var optContract = { value: 866760040, text: "Contract" };
                    var optCommercial = { value: 866760041, text: "Commercial" };
                    var optTransactional = { value: 866760042, text: "Transactional" };

                    var varInternationalWholesale = ["Property Damage", "Business Interruption", "Terrorism"];
                    var varRealEstate = ["Property Owners", "Property Owners Liability", "Terrorism", "Contract Works", "EL", "Construction"];
                    var varSpecialtyEngineering = ["EAR", "Other Engineering", "Conventional Power", "Renewable energy", "Terrorism"];
                    var varRiskManagedUKLiability = ["EL", "PL", "Products", "Terrorism", "EIL"];
                    var varSpecialtyGroupPABusinessTravel = ["Personal Accident", "Business Travel", "Illness", "PA while travelling"];
                    var varCargo = ["Stock", "Transit", "Project", "DSU", "War", "Excess", "Terrorism"];
                    var varHull = ["H&M", "IV", "Loss of Hire", "War", "MII / MAP", "Terrorism"];
                    var varHullConstruction = ["Builder's Risk", "Yard Property", "SRL", "War", "Warranty", "Terrorism"];
                    var varMarineLiability = ["IG P&I", "IG Non-Pooled Risk", "Fixed Premium P&I", "SRL", "Terminal Operator's Liability", "Marine EL", "Marine GL", "Terrorism"];
                    var varYacht = ["H&M", "IV", "Loss of Hire", "Terrorism", "War"];

                    if (formContext.getAttribute("rsa_cover").getValue() != null && formContext.getAttribute("rsa_cover").getValue() != "undefined") {
                        covervalue = formContext.getAttribute("rsa_cover").getText()[0];
                    }
                    formContext.getControl("rsa_cover").clearOptions();
                    formContext.getAttribute("rsa_cover").setValue(null);

                    if ((GBM === "International Wholesale") || GBM === ("Risk Managed UK Property")) {
                        formContext.getControl("rsa_cover").addOption(optPropertyDamage);
                        formContext.getControl("rsa_cover").addOption(optBusinessInterruption);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Real Estate") {
                        formContext.getControl("rsa_cover").addOption(optPropertyOwners);
                        formContext.getControl("rsa_cover").addOption(optPropertyOwnersLiability);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optContractWorks);
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optConstruction); //Construction 866,760,034
                    } else if (GBM === "Specialty Engineering & Renewable Energy") {
                        formContext.getControl("rsa_cover").addOption(optEAR);
                        formContext.getControl("rsa_cover").addOption(optOtherEngineering);
                        formContext.getControl("rsa_cover").addOption(optConventionalPower);
                        formContext.getControl("rsa_cover").addOption(optRenewableenergy);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Risk Managed UK Liability") {
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optPL);
                        formContext.getControl("rsa_cover").addOption(optProducts);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optEIL); //EIL 866,760,035
                    } else if (GBM === "Wholesale International Casualty") {
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optPL);
                        formContext.getControl("rsa_cover").addOption(optProducts);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optEIL);
                    } else if (GBM === "Specialty Group PA & Business Travel" || GBM === "Mid-Market Group PA & Business Travel") {
                        formContext.getControl("rsa_cover").addOption(optPersonalAccident);
                        formContext.getControl("rsa_cover").addOption(optBusinessTravel);
                        formContext.getControl("rsa_cover").addOption(optIllness);
                        formContext.getControl("rsa_cover").addOption(optPAwhiletravelling);
                    } else if (GBM === "Cargo") {
                        formContext.getControl("rsa_cover").addOption(optStock);
                        formContext.getControl("rsa_cover").addOption(optTransit);
                        formContext.getControl("rsa_cover").addOption(optProject);
                        formContext.getControl("rsa_cover").addOption(optDSU);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optExcess);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Hull") {
                        formContext.getControl("rsa_cover").addOption(optHM);
                        formContext.getControl("rsa_cover").addOption(optIV);
                        formContext.getControl("rsa_cover").addOption(optLossofHire);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optMIIMAP);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Hull Construction") {
                        formContext.getControl("rsa_cover").addOption(optBuildersRisk);
                        formContext.getControl("rsa_cover").addOption(optYardProperty);
                        formContext.getControl("rsa_cover").addOption(optSRL);
                        formContext.getControl("rsa_cover").addOption(optWarranty); //Warranty 866,760,036
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Marine Liability") {
                        formContext.getControl("rsa_cover").addOption(optIGPI); //IG P&I 866,760,037
                        formContext.getControl("rsa_cover").addOption(optIGNonPooledRisk); //IG Non-Pooled Risk 866,760,038
                        formContext.getControl("rsa_cover").addOption(optFixedPremiumPI); //Fixed Premium P&I 866,760,039
                        formContext.getControl("rsa_cover").addOption(optSRL);
                        formContext.getControl("rsa_cover").addOption(optTerminalOperatorsLiability);
                        formContext.getControl("rsa_cover").addOption(optMarineEL);
                        formContext.getControl("rsa_cover").addOption(optMarineGL);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Yacht") {
                        formContext.getControl("rsa_cover").addOption(optHM);
                        formContext.getControl("rsa_cover").addOption(optIV);
                        formContext.getControl("rsa_cover").addOption(optLossofHire);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    }
                    else if (GBM === "Surety") {

                        formContext.getControl("rsa_cover").addOption(optContract);
                        formContext.getControl("rsa_cover").addOption(optCommercial);
                        formContext.getControl("rsa_cover").addOption(optTransactional);

                    }

                }

            }
        } catch (err) {
            Xrm.Navigation.openAlertDialog({ text: "FilterCoverOptionSetVAluesBasedOnGBM -" + err.message });
        }
    },
    // Author : Hanumantha
    // Date_Created : 25 Feb 2025
    // This function is to filter the Cover option set values based on GBM lookup field selection.
    FilterCoverOptionSetVAluesBasedOnGBMOnLoad: function (executionContext) {
        try {

            var formContext = executionContext.getFormContext();
            if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined" && formContext.getAttribute("rsa_cover") !== null && formContext.getAttribute("rsa_cover") !== "undefined") {
                var PL, GBM, coverOptionSetValues, covervalue;
                //if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                //    PL = formContext.getAttribute("rsa_pl").getValue()[0].name;
                //}

                if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                    GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;

                    var optPropertyDamage = { value: 866760000, text: "Property Damage" };
                    var optBusinessInterruption = { value: 866760001, text: "Business Interruption" };
                    var optTerrorism = { value: 866760002, text: "Terrorism" };
                    var optPropertyOwners = { value: 866760003, text: "Property Owners" };
                    var optPropertyOwnersLiability = { value: 866760004, text: "Property Owners Liability" };
                    var optContractWorks = { value: 866760005, text: "Contract Works" };
                    var optEL = { value: 866760006, text: "EL" };
                    var optEAR = { value: 866760007, text: "EAR" };
                    var optOtherEngineering = { value: 866760008, text: "Other Engineering" };
                    var optConventionalPower = { value: 866760009, text: "Conventional Power" };
                    var optRenewableenergy = { value: 866760010, text: "Renewable energy" };
                    var optPL = { value: 866760011, text: "PL" };
                    var optProducts = { value: 866760012, text: "Products" };
                    var optEIL = { value: 866760013, text: "EIL" };
                    var optPersonalAccident = { value: 866760014, text: "Personal Accident" };
                    var optBusinessTravel = { value: 866760015, text: "Business Travel" };
                    var optIllness = { value: 866760016, text: "Illness" };
                    var optPAwhiletravelling = { value: 866760017, text: "PA while travelling" };
                    var optStock = { value: 866760018, text: "Stock" };
                    var optTransit = { value: 866760019, text: "Transit" };
                    var optProject = { value: 866760020, text: "Project" };
                    var optDSU = { value: 866760021, text: "DSU" };
                    var optWar = { value: 866760022, text: "War" };
                    var optExcess = { value: 866760023, text: "Excess" };
                    var optHM = { value: 866760024, text: "H&M" };
                    var optIV = { value: 866760025, text: "IV" };
                    var optLossofHire = { value: 866760026, text: "Loss of Hire" };
                    var optMIIMAP = { value: 866760027, text: "MII / MAP" };
                    var optBuildersRisk = { value: 866760028, text: "Builder's Risk" };
                    var optYardProperty = { value: 866760029, text: "Yard Property" };
                    var optSRL = { value: 866760030, text: "SRL" };
                    var optTerminalOperatorsLiability = { value: 866760031, text: "Terminal Operator's Liability" };
                    var optMarineEL = { value: 866760032, text: "Marine EL" };
                    var optMarineGL = { value: 866760033, text: "Marine GL" };
                    var optConstruction = { value: 866760034, text: "Construction" };
                    //  var optEIL = { value: 866760035, text: "EIL" };
                    var optWarranty = { value: 866760036, text: "Warranty" };
                    var optIGPI = { value: 866760037, text: "IG P&I" };
                    var optIGNonPooledRisk = { value: 866760038, text: "IG Non-Pooled Risk" };
                    var optFixedPremiumPI = { value: 866760039, text: "Fixed Premium P&I" };
                    var optContract = { value: 866760040, text: "Contract" };
                    var optCommercial = { value: 866760041, text: "Commercial" };
                    var optTransactional = { value: 866760042, text: "Transactional" };

                    var varInternationalWholesale = ["Property Damage", "Business Interruption", "Terrorism"];
                    var varRealEstate = ["Property Owners", "Property Owners Liability", "Terrorism", "Contract Works", "EL", "Construction"];
                    var varSpecialtyEngineering = ["EAR", "Other Engineering", "Conventional Power", "Renewable energy", "Terrorism"];
                    var varRiskManagedUKLiability = ["EL", "PL", "Products", "Terrorism", "EIL"];
                    var varSpecialtyGroupPABusinessTravel = ["Personal Accident", "Business Travel", "Illness", "PA while travelling"];
                    var varCargo = ["Stock", "Transit", "Project", "DSU", "War", "Excess", "Terrorism"];
                    var varHull = ["H&M", "IV", "Loss of Hire", "War", "MII / MAP", "Terrorism"];
                    var varHullConstruction = ["Builder's Risk", "Yard Property", "SRL", "War", "Warranty", "Terrorism"];
                    var varMarineLiability = ["IG P&I", "IG Non-Pooled Risk", "Fixed Premium P&I", "SRL", "Terminal Operator's Liability", "Marine EL", "Marine GL", "Terrorism"];
                    var varYacht = ["H&M", "IV", "Loss of Hire", "Terrorism", "War"];
                    var varSurety = ["Commercial", "Contract", "Transactional"];

                    if (formContext.getAttribute("rsa_cover").getValue() != null && formContext.getAttribute("rsa_cover").getValue() != "undefined") {
                        covervalue = formContext.getAttribute("rsa_cover").getText()[0];
                    }
                    formContext.getControl("rsa_cover").clearOptions();
                    if ((GBM === "International Wholesale") || GBM === ("Risk Managed UK Property")) {
                        if (!varInternationalWholesale.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optPropertyDamage);
                        formContext.getControl("rsa_cover").addOption(optBusinessInterruption);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Real Estate") {

                        if (!varRealEstate.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optPropertyOwners);
                        formContext.getControl("rsa_cover").addOption(optPropertyOwnersLiability);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optContractWorks);
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optConstruction); //Construction 866,760,034
                    } else if (GBM === "Specialty Engineering & Renewable Energy") {

                        if (!varSpecialtyEngineering.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optEAR);
                        formContext.getControl("rsa_cover").addOption(optOtherEngineering);
                        formContext.getControl("rsa_cover").addOption(optConventionalPower);
                        formContext.getControl("rsa_cover").addOption(optRenewableenergy);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Risk Managed UK Liability") {

                        if (!varRiskManagedUKLiability.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optPL);
                        formContext.getControl("rsa_cover").addOption(optProducts);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optEIL); //EIL 866,760,035
                    }else if (GBM === "Wholesale International Casualty") {

                        if (!varRiskManagedUKLiability.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optEL);
                        formContext.getControl("rsa_cover").addOption(optPL);
                        formContext.getControl("rsa_cover").addOption(optProducts);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                        formContext.getControl("rsa_cover").addOption(optEIL);
                    } else if (GBM === "Specialty Group PA & Business Travel" || GBM === "Mid-Market Group PA & Business Travel") {

                        if (!varSpecialtyGroupPABusinessTravel.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optPersonalAccident);
                        formContext.getControl("rsa_cover").addOption(optBusinessTravel);
                        formContext.getControl("rsa_cover").addOption(optIllness);
                        formContext.getControl("rsa_cover").addOption(optPAwhiletravelling);
                    } else if (GBM === "Cargo") {

                        if (!varCargo.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optStock);
                        formContext.getControl("rsa_cover").addOption(optTransit);
                        formContext.getControl("rsa_cover").addOption(optProject);
                        formContext.getControl("rsa_cover").addOption(optDSU);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optExcess);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Hull") {

                        if (!varHull.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optHM);
                        formContext.getControl("rsa_cover").addOption(optIV);
                        formContext.getControl("rsa_cover").addOption(optLossofHire);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optMIIMAP);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Hull Construction") {

                        if (!varHullConstruction.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optBuildersRisk);
                        formContext.getControl("rsa_cover").addOption(optYardProperty);
                        formContext.getControl("rsa_cover").addOption(optSRL);
                        formContext.getControl("rsa_cover").addOption(optWarranty); //Warranty 866,760,036
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Marine Liability") {

                        if (!varMarineLiability.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optIGPI); //IG P&I 866,760,037
                        formContext.getControl("rsa_cover").addOption(optIGNonPooledRisk); //IG Non-Pooled Risk 866,760,038
                        formContext.getControl("rsa_cover").addOption(optFixedPremiumPI); //Fixed Premium P&I 866,760,039
                        formContext.getControl("rsa_cover").addOption(optSRL);
                        formContext.getControl("rsa_cover").addOption(optTerminalOperatorsLiability);
                        formContext.getControl("rsa_cover").addOption(optMarineEL);
                        formContext.getControl("rsa_cover").addOption(optMarineGL);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Yacht") {

                        if (!varYacht.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optHM);
                        formContext.getControl("rsa_cover").addOption(optIV);
                        formContext.getControl("rsa_cover").addOption(optLossofHire);
                        formContext.getControl("rsa_cover").addOption(optWar);
                        formContext.getControl("rsa_cover").addOption(optTerrorism);
                    } else if (GBM === "Surety") {
                        if (!varSurety.includes(covervalue)) {
                            formContext.getControl("rsa_cover").clearOptions();
                            formContext.getAttribute("rsa_cover").setValue(null);
                        }
                        formContext.getControl("rsa_cover").addOption(optContract);
                        formContext.getControl("rsa_cover").addOption(optCommercial);
                        formContext.getControl("rsa_cover").addOption(optTransactional);

                    }

                }

            }
        } catch (err) {
            Xrm.Navigation.openAlertDialog({ text: "FilterCoverOptionSetVAluesBasedOnGBM -" + err.message });
        }
    },

    enableOptionsBasedOnSelection: function () {

        var multiSelectValue = Xrm.Page.getAttribute("rsa_largecorporateriskexemptioncriteriamet").getValue();
        var fieldName = 'rsa_largecorporateriskexemptioncriteriamet';
        var formContext = Xrm.Page;
        //Get The Multiselect-control
        var multiSelectControl = formContext.getControl(fieldName);

        // clear all options

        multiSelectControl.clearOptions();
        // define the option with numeric values

        var initialOptions = [{
            value: 866760000,
            text: 'Railway rolling stock, aircraft, ships (sea, lake, river and canal vessels), goods in transit, aircraft liability and liability of ships (sea, lake, river and canal vessels)'
        }, {
            value: 866760001,
            text: 'Credit and suretyship, where the policyholder is engaged professionally in an industrial or commercial activity or in one of the liberal professions, and the risks relate to such activity'
        }, {
            value: 866760002,
            text: 'Land vehicles (ex. railway rolling stock), fire and natural forces, other property damage, motor vehicle & general liability, & miscellaneous financial loss, where the policyholder exceeds the limits of at least 2 of the following:'
        }];

        // Initially enable the first three options only if 'Large Corporate' is selected

        //if (customerTypeValue && customerTypeValue === 866760006) {

        initialOptions.forEach(function (option) {
            multiSelectControl.addOption(option)
        });
        //set the multiselect field as visible

        //    multiSelectControl.setVisible(true);
        //    //formContext.getAttribute(fieldName).setRequiredLevel("required");
        //} else {
        //if Large corporate is not selected hide the field and clear options

        // multiSelectControl.setVisible(false);
        // formContext.getAttribute(fieldName).setRequiredLevel("none");
        //  multiSelectControl.clearOptions();
        //   }

        // If 3rd option is selected from the multi selected option set enable the remaining options

        if (multiSelectValue && multiSelectValue.includes(866760002)) {
            //define the remaining options

            var remainingOptions = [{
                value: 866760003,
                text: 'Balance sheet total: 6.2 million'
            }, {
                value: 866760004,
                text: 'Net turnover: 12.8 million'
            }, {
                value: 866760005,
                text: 'Average number of employees during the financial year: 250'
            }];
            //Enable the remaining options

            remainingOptions.forEach(function (option) {
                multiSelectControl.addOption(option)
            });
        }
    },
    //new code
    HideMTANewButton: function (primaryControl) {
        ////debugger;
        var formContext = primaryControl;
        if (formContext.getControl("rsa_opportunitystage") != null &&
            formContext.getControl("rsa_opportunitystage").getAttribute() != null &&
            formContext.getControl("rsa_opportunitystage").getAttribute().getValue() == 866760000) {
            return true;
        }
        else
            return false;
    },

    ShowNotificationOnOpportunity: function (executionContext) {
        var formContext = executionContext.getFormContext();

        var CurrentRecord = formContext.data.entity.getId();


        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/rsa_mtas?$select=rsa_mtaperiodstartdate,rsa_name&$filter=_rsa_slopportunity_value eq " + CurrentRecord, false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    var names = "";
                    for (var i = 0; i < results.value.length; i++) {
                        var rsa_mtaperiodstartdate = results.value[i]["rsa_mtaperiodstartdate"];
                        var rsa_name = results.value[i]["rsa_name"];

                        var timestamp = new Date().getTime() + (30 * 24 * 60 * 60 * 1000)



                        if (new Date(rsa_mtaperiodstartdate) > new Date(timestamp)) {
                            // The selected time is more than 30 days from now
                            names += rsa_name + ",";
                        }
                    }

                    if (names != "") {
                        formContext.ui.setFormNotification("These All MTAs" + names + "more than 30days", "INFO", "1001");
                    }
                    else {
                        formContext.ui.clearFormNotification("1001");
                    }

                }
            }
        };
        req.send();
    },

    ShowLargeCorporate: function (executionContext) {

        var formContext = executionContext.getFormContext();
        var IsVisible = true;
        var controlArray = ['rsa_largecorporateriskexemptioncriteriamet'];
        if (formContext.getAttribute("rsa_customertype").getValue() != null && formContext.getAttribute("rsa_customertype").getValue() == 866760006) {
            RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, true, false);
        }
        else {
            RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, false, false);
            formContext.getAttribute("rsa_largecorporateriskexemptioncriteriamet").setValue(null);
        }
    },
    DateTermsRequiredByBrokerCustomerValidation: function (executionContext) {

        var formContext = executionContext.getFormContext();
        var datetermsrequired, policystartdate;
        //if (formContext.getAttribute("rsa_datetermsrequiredbybrokercustomer").getValue() !== null) {
        //    datetermsrequired = formContext.getAttribute("rsa_datetermsrequiredbybrokercustomer").getValue();
        //}

        if (formContext.getAttribute("rsa_policystartdate").getValue() !== null) {
            policystartdate = formContext.getAttribute("rsa_policystartdate").getValue();
        }

        if (policystartdate !== undefined) {
            // var formatteddatetermsrequired = new Date(datetermsrequired);
            var formattedpolicystartdate = new Date(policystartdate);

            formattedpolicystartdate.setDate(formattedpolicystartdate.getDate() - 21);

            formContext.getAttribute("rsa_datetermsrequiredbybrokercustomer").setValue(formattedpolicystartdate);

            //if (formatteddatetermsrequired > formattedpolicystartdate) {
            //    formContext.getControl("rsa_datetermsrequiredbybrokercustomer").setNotification("Please enter a valid dtae.", 105);
            //}
            //else {
            //    formContext.getControl("rsa_datetermsrequiredbybrokercustomer").clearNotification(105);
            //}
        }
        //else {
        //    formContext.getControl("rsa_datetermsrequiredbybrokercustomer").clearNotification(105);
        //}
    },

    PolicyStartDateValidation: function (executionContext) {

        var formContext = executionContext.getFormContext();
        if ((formContext.getAttribute("rsa_policystartdate").getValue() !== null) && (formContext.getAttribute("rsa_policyexpirydate").getValue() !== null)) {
            var policystartdate = formContext.getAttribute("rsa_policystartdate").getValue();
            var policyenddate = formContext.getAttribute("rsa_policyexpirydate").getValue();
            var _startdate = new Date(policystartdate);
            var _enddate = new Date(policyenddate);
            var formItemId = formContext.ui.formSelector.getCurrentItem().getLabel();

            // if (formItemId === "Standard Policy") {
            if (_startdate > _enddate) {
                formContext.getControl("rsa_policystartdate").setNotification("Policy Start Date should be less than or equal to Policy Expiry Date.", 102);
            }
            else {
                formContext.getControl("rsa_policystartdate").clearNotification(102);
            }
        }
        else {
            if (_startdate > _enddate) {
                formContext.getControl("rsa_policystartdate").setNotification("Policy Start Date should be less than or equal to Policy Expiry Date.", 102);
            }
            else {
                formContext.getControl("rsa_policystartdate").clearNotification(102);
            }
        }
        // }
    },

    PolicyEndDateValidation: function (executionContext) {
        var formContext = executionContext.getFormContext();
        if ((formContext.getAttribute("rsa_policystartdate").getValue() !== null) && (formContext.getAttribute("rsa_policyexpirydate").getValue() !== null)) {
            var policystartdate = formContext.getAttribute("rsa_policystartdate").getValue();
            var policyenddate = formContext.getAttribute("rsa_policyexpirydate").getValue();
            var _startdate = new Date(policystartdate);
            var _enddate = new Date(policyenddate);
            if (_startdate > _enddate) {
                formContext.getControl("rsa_policyexpirydate").setNotification("Policy Expiry Date should be greater than or equal to Policy Start Date.", 103);
            }
            else {
                formContext.getControl("rsa_policyexpirydate").clearNotification(103);
            }
        }
    },
    ShowHidePOLSection: function (executionContext) {
        ////debugger;
        var formContext = executionContext.getFormContext();
        if (formContext.ui.tabs.get("tab_2") !== null) {
            formContext.ui.tabs.get("tab_2").sections.get("tab_2_section_4").setVisible(false);
        }
        var GBM, covervalarr;
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_cover") !== null && formContext.getAttribute("rsa_cover") !== "undefined") {
            if (formContext.getAttribute("rsa_cover").getValue() !== null) {
                covervalarr = formContext.getAttribute("rsa_cover").getText();
            }
        }
        if (covervalarr !== undefined) {
            if (GBM === "Real Estate" && covervalarr.includes("Property Owners Liability")) {
                if (formContext.ui.tabs.get("tab_2") !== null) {
                    formContext.ui.tabs.get("tab_2").sections.get("tab_2_section_4").setVisible(true);
                }
            }
        }
    },
    ShowHideAandHTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl;
        if (formContext.getAttribute("rsa_pl").getValue() !== null) {
            pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
        }
        if (pl === "Group PA & Business Travel") {
            formContext.ui.tabs.get("AH").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("AH").setVisible(false);
        }
    },
    ShowHideMarineTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, GBM;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }

        if (formContext.ui.tabs.get("marine") !== null) {
            formContext.ui.tabs.get("marine").sections.get("marine_section_4").setVisible(false);
        }

        if (pl === "Marine") {
            formContext.ui.tabs.get("marine").setVisible(true);
            if (GBM === "Yacht") {
                formContext.ui.tabs.get("marine").sections.get("marine_section_4").setVisible(true);
            }
        }
        else {
            formContext.ui.tabs.get("marine").setVisible(false);
        }
    },
    ShowHideEandRETab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl;
        if (formContext.getAttribute("rsa_pl").getValue() !== null) {
            pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
        }
        if (pl === "Engineering & Renewable Energy") {
            formContext.ui.tabs.get("ere").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("ere").setVisible(false);
        }
    },
    ShowHideRMUKPropertyTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, GBM;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }

        if (pl === "Property" && GBM === "Risk Managed UK Property") {
            formContext.ui.tabs.get("rmukproperty").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("rmukproperty").setVisible(false);
        }
    },
    ShowHideRealEstateTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, GBM;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }

        if (pl === "Property" && GBM === "Real Estate") {
            formContext.ui.tabs.get("realestate").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("realestate").setVisible(false);
        }
    },
    ShowHideLiabilityTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }

        if (pl === "SL Casualty") {
            formContext.ui.tabs.get("liability").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("liability").setVisible(false);
        }
    },
    ShowHidewicSection: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, Distribution;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {
            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }

        if (pl === "SL Casualty" && Distribution === "Wholesale Broker/Partner") {
            formContext.ui.tabs.get("liability").sections.get("liability_section_2").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("liability").sections.get("liability_section_2").setVisible(false);
        }
    },
    ShowHideMultinationalTab: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var territorialExposure;

        if (formContext.getAttribute("rsa_territorialexposure") !== null && formContext.getAttribute("rsa_territorialexposure") !== "undefined") {

            if (formContext.getAttribute("rsa_territorialexposure").getValue() !== null) {
                territorialExposure = formContext.getAttribute("rsa_territorialexposure").getText();
            }
        }
        if (territorialExposure !== null && territorialExposure !== undefined) {
            if (territorialExposure.includes("Complex Multinational")) {
                formContext.ui.tabs.get("multinationals").setVisible(true);
            }
            else {
                formContext.ui.tabs.get("multinationals").setVisible(false);
            }
        }
        else {
            formContext.ui.tabs.get("multinationals").setVisible(false);
        }
    },
    //Make fields under A&H tab mandatory at stage3 for New Business, stage 1 for Renewals under A&H tab,
    AnHFieldsMandatoryCheck: function (executionContext) {

        var formContext = executionContext.getFormContext();
        //We will add Renewal logic when it's implemented.
        //var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3
        var IsfastTrack = false;

        var controlArray = ['rsa_fasttrack', 'rsa_papremiumpc', 'rsa_businesstravelpremiumpc', 'rsa_holidaytravelpremiumpc', 'rsa_illnesstravelpremiumpc'];

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        if (formContext.getAttribute("rsa_fasttrack").getValue() !== null) {
            IsfastTrack = formContext.getAttribute("rsa_fasttrack").getValue();
        }
        controlArray = ['rsa_fasttracklastreviewdate', 'rsa_fasttracknextreviewdate'];
        if (IsMandatory === true && IsfastTrack === true) {
            RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, true);
        } else {
            RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, false);
        }

    },
    //Set default next review date i.e. lasr review date + 3 years
    SetNextReviewDateValue: function (executionContext) {

        var formContext = executionContext.getFormContext();
        formContext.getAttribute("rsa_fasttracknextreviewdate").setValue(null);
        var lastreviewdate;
        if (formContext.getAttribute("rsa_fasttracklastreviewdate").getValue() !== null) {
            lastreviewdate = formContext.getAttribute("rsa_fasttracklastreviewdate").getValue();
        }

        if (lastreviewdate !== undefined) {
            var formattedlastreviewdate = new Date(lastreviewdate);
            formattedlastreviewdate.setFullYear(formattedlastreviewdate.getFullYear() + 3);
            formContext.getAttribute("rsa_fasttracknextreviewdate").setValue(formattedlastreviewdate);
        }
    },
    //Make fields under Marine tab mandatory at stage3 for New Business
    MarineFieldsMandatoryCheck: function (executionContext) {

        var formContext = executionContext.getFormContext();
        // var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3    
        var anualProject, GBM, sourceCountry;

        var controlArray = ['rsa_annualproject', 'rsa_uwrationale', 'rsa_coverspreadsheetupdated', 'rsa_exposuresapplicable', 'rsa_exposurecountry', 'rsa_sourcearea', 'rsa_synergybranch', 'rsa_sourcecountry', 'rsa_classification', 'rsa_methodofplacementsynergy', 'rsa_risk'];

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        if (formContext.getAttribute("rsa_annualproject").getValue() !== null) {
            anualProject = formContext.getAttribute("rsa_annualproject").getText();
        }
        if (anualProject === "Project") {
            formContext.getAttribute("rsa_projectname").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_projectname").setRequiredLevel("none");
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (GBM === "Yacht") {
            formContext.getAttribute("rsa_coverspreadsheetupdated").setRequiredLevel("none");
        }
        if (formContext.getAttribute("rsa_sourcecountry") !== null && formContext.getAttribute("rsa_sourcecountry") !== "undefined") {
            if (formContext.getAttribute("rsa_sourcecountry").getValue() !== null) {
                sourceCountry = formContext.getAttribute("rsa_sourcecountry").getValue()[0].name;
            }
        }
        if (sourceCountry === "US - United States") {
            formContext.getControl("rsa_usstate").setDisabled(false);
            formContext.getAttribute("rsa_usstate").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_usstate").setValue(null);
            formContext.getAttribute("rsa_usstate").setRequiredLevel("none");
            formContext.getControl("rsa_usstate").setDisabled(true);
        }
    },
    //Make fields under E&RE tab mandatory at stage3 for New Business
    EnREFieldsMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        // var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3    

        var controlArray = ['rsa_oarorconstruction', 'rsa_coalexposure', 'rsa_gasexposure', 'rsa_oilexposure', 'rsa_dieselexposure', 'rsa_solarexposure', 'rsa_hydroexposure', 'rsa_bioexposure', 'rsa_bessexposure', "rsa_geothermalexposure", "rsa_windexposure",
            "rsa_otherexposure"];

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);
    },
    //Make fields under RM UK Property tab mandatory at stage3 for New Business
    RMUKPropertyFieldsMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        //  var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3    
        var claimtype;
        var controlArray = ['rsa_howarewenotifiedabouttheclaim'];

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        if (formContext.getAttribute("rsa_howarewenotifiedabouttheclaim").getValue() !== null) {
            claimtype = formContext.getAttribute("rsa_howarewenotifiedabouttheclaim").getText();
        }
        if (IsMandatory === true) {
            if (claimtype === "Other") {
                formContext.getAttribute("rsa_otherclaimtype").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_otherclaimtype").setRequiredLevel("none");
            }
        }
    },
    //Make fields under Real Estate tab mandatory at stage2 for New Business
    RealEstateFieldsMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        //  var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3   
        var controlArray = ['rsa_cypolrsashare', 'rsa_poltri'];

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Quoted" || OptStage === "Accepted - TBU" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

    },
    //Make fields under RM UK Liability tab mandatory at stage3 for New Business
    RMUKLiabilityFieldsMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        //var transactionType = "New Business";
        var IsMandatory = false; //New Business at stage 3    
        var IsUSExposure;
        var controlArray = ['rsa_isthereanyusexposure'];
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);


        if (formContext.getAttribute("rsa_isthereanyusexposure").getValue() !== null) {
            IsUSExposure = formContext.getAttribute("rsa_isthereanyusexposure").getValue();
        }
        if (IsUSExposure === true) {
            formContext.getAttribute("rsa_usexposure").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_usexposure").setRequiredLevel("none");
        }
    },

    //Legal title field mandatory check
    LegalTileFieldMandatoryCheck: function (executionContext) {

        var formContext = executionContext.getFormContext();
        var legalTitle;

        if (formContext.getAttribute("rsa_legaltitlecompanytype") !== null && formContext.getAttribute("rsa_legaltitlecompanytype") !== "undefined") {
            if (formContext.getAttribute("rsa_legaltitlecompanytype").getValue() !== null) {
                legalTitle = formContext.getAttribute("rsa_legaltitlecompanytype").getText();
            }
        }

        if (legalTitle === "Other") {
            formContext.getControl("rsa_whatistheirlegaltitle").setVisible(true);
            formContext.getAttribute("rsa_whatistheirlegaltitle").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_whatistheirlegaltitle").setValue(null);
            formContext.getAttribute("rsa_whatistheirlegaltitle").setRequiredLevel("none");
            formContext.getControl("rsa_whatistheirlegaltitle").setVisible(false);
        }

    },
    //Fields Mandatory At Alternative Stage 3
    FieldsMandatoryAtAlternativeStageThree: function (executionContext) {

        var formContext = executionContext.getFormContext();
        var IsMandatory = false;
        var controlArray = ['rsa_doyouknowthefinalpremiumdp', 'rsa_finalquotedprice100pc', 'rsa_quotedlinesize', 'rsa_outcomeleadinsurerlookup', 'rsa_outcomereasonid'];
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage === "Lapsed" || OptStage === "Not taken Up" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }
        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        controlArray = ['rsa_outcomereasonid'];
        if (OptStage === "Diverted" || OptStage === "Declined to Renew" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        } else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo(executionContext); //calling Stage 2 method
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne(executionContext); //calling Stage 1 method

        var IsDoyouKnowFinalPremium = "No";
        if (formContext.getAttribute("rsa_doyouknowthefinalpremiumdp") !== null && formContext.getAttribute("rsa_doyouknowthefinalpremiumdp") !== "undefined") {
            if (formContext.getAttribute("rsa_doyouknowthefinalpremiumdp").getValue() !== null) {
                IsDoyouKnowFinalPremium = formContext.getAttribute("rsa_doyouknowthefinalpremiumdp").getText();
            }
        }
        if (IsDoyouKnowFinalPremium === "Yes") {
            formContext.getAttribute("rsa_100boundpremiumpc").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_100boundpremiumpc").setRequiredLevel("none");
        }
    },
    //Fields mandatory at stage 1
    FieldsMandatoryAtStageOne: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var IsMandatory = false;
        var controlArray = ['rsa_customer', 'rsa_brokername', 'rsa_customertype', 'rsa_datequotereceived', 'rsa_gbm', 'rsa_pl', 'rsa_policylength', 'rsa_policyexpirydate', 'rsa_policystartdate', 'rsa_underwritertrader', 'rsa_londonregionslloyds'];
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage === "In Play" || OptStage === "Pipeline" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }

        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        if (IsMandatory === true || OptStage === "Lapsed" || OptStage === "Not taken Up" || OptStage === "Diverted" || OptStage === "Declined to Renew" || OptStage === "Quoted" || OptStage === "Accepted - TBU" || OptStage === "Accepted") {
            RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, true);
        }

        // var customerType;
        // if (formContext.getAttribute("rsa_customertype") !== null && formContext.getAttribute("rsa_customertype") !== "undefined") {
        //     if (formContext.getAttribute("rsa_customertype").getValue() !== null) {
        //         customerType = formContext.getAttribute("rsa_customertype").getText();
        //     }
        // }
        // if (customerType === "Large Corporate") {
        // formContext.getAttribute("rsa_largecorporateriskexemptioncriteriamet").setRequiredLevel("required");
        // } else {
        //    formContext.getAttribute("rsa_largecorporateriskexemptioncriteriamet").setRequiredLevel("none");
        // }
    },
    //Trade field mandatory check
    TradeFieldMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var GBM;
        if (formContext.getAttribute("rsa_pl").getValue() !== null && formContext.getAttribute("rsa_gbm").getValue() !== null) {
            GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name
        }

        if (GBM == "Yacht") {
            formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("none");
            formContext.getControl("rsa_whatistheirtradelookup").setVisible(false);
        } else {
            if (formContext.getAttribute("rsa_siccodedescription") !== null && formContext.getAttribute("rsa_siccodedescription") !== "undefined") {
                if (formContext.getAttribute("rsa_siccodedescription").getValue() !== null) {
                    formContext.getAttribute("rsa_whatistheirtradelookup").setValue(null);
                    formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("none");
                    formContext.getControl("rsa_whatistheirtradelookup").setVisible(false);
                } else {
                    formContext.getControl("rsa_whatistheirtradelookup").setVisible(true);
                }
            }
            var customerTypeval;
            customerTypeval = formContext.getAttribute("rsa_customertype").getValue();
            var OptStage;
            OptStage = formContext.getAttribute("rsa_opportunitystage").getText();

            if (customerTypeval !== null && customerTypeval == 866760000) {
                formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("none");
            }
            else if (customerTypeval !== null && customerTypeval !== 866760000 && OptStage !== null && OptStage !== "undefined" && OptStage !== "In Play" && OptStage !== "Pipeline" && OptStage !== "Renewal Work-Up" && OptStage !== "Quoted - VRI") {
                formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("required");
            }
            else {
                formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("none");
            }
        }
    },
    //Fields mandatory at stage 2
    FieldsMandatoryAtStageTwo: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var IsMandatory = false;
        //  var arr1 = ['rsa_customer', 'rsa_brokername', 'rsa_customertype', 'rsa_datequotereceived', 'rsa_gbm', 'rsa_pl', 'rsa_policylength', 'rsa_policyexpirydate', 'rsa_policystartdate', 'rsa_underwritertrader', 'rsa_londonregionslloyds'];
        // var arr2 = ['rsa_brokertargetpremiumpc', 'rsa_whatistheirlegaltitle', 'rsa_cyterrorismpremiumgross100ptcpc', 'rsa_cyterrorismcommissionpctrsashare', 'rsa_estimatedsigningpercentage', 'rsa_companieshouserefnumbercharitynumber', 'rsa_gicscode', 'rsa_siccodedescription', 'rsa_cytri', 'rsa_cyorder', 'rsa_basecommissionpercent', 'rsa_basecommission', 'rsa_cygwp100exgrossupsandterrorismpc', 'rsa_datetermsissuedtobrokercustomer', 'rsa_distribution', 'rsa_distributionmethod', 'rsa_fullvalueprimaryxolquotashare', 'rsa_insuredscountryofdomicile', 'rsa_macquariepolicy', 'rsa_methodofplacement', 'rsa_territorialexposure', 'rsa_typeofcontact', 'rsa_whatistheirtradelookup', 'rsa_brokerpresentationchannel', 'rsa_datetermsrequiredbybrokercustomer'];
        var controlArray = ['rsa_poltri', 'rsa_cypolrsashare', 'rsa_brokertargetpremiumpc', 'rsa_whatistheirlegaltitle', 'rsa_cyterrorismpremiumgross100ptcpc', 'rsa_cyterrorismcommissionpctrsashare', 'rsa_estimatedsigningpercentage', 'rsa_cyorder', 'rsa_cygwp100exgrossupsandterrorismpc', 'rsa_datetermsissuedtobrokercustomer', 'rsa_distribution', 'rsa_distributionmethod', 'rsa_fullvalueprimaryxolquotashare', 'rsa_insuredscountryofdomicile', 'rsa_macquariepolicy', 'rsa_methodofplacement', 'rsa_territorialexposure', 'rsa_brokerpresentationchannel', 'rsa_datetermsrequiredbybrokercustomer', 'rsa_cyrsawritten'];
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage === "Quoted" || OptStage === "Accepted - TBU" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }
        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        //RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne(executionContext); //calling Stage 1 method
        if (OptStage === "Lapsed" || OptStage === "Not taken Up" || OptStage === "Diverted" || OptStage === "Declined to Renew" || OptStage === "Quoted" || OptStage === "Accepted - TBU" || OptStage === "Accepted") {
            RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, true);
        }
        if (OptStage === "Renewal Work-Up") {
            formContext.getAttribute("rsa_brokertargetpremiumpc").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_brokertargetpremiumpc").setRequiredLevel("none");
        }
        RSA.D365CRM.SLOpportunity.Main.TradeFieldMandatoryCheck(executionContext);

        var domicile;
        if (formContext.getAttribute("rsa_insuredscountryofdomicile") !== null && formContext.getAttribute("rsa_insuredscountryofdomicile") !== "undefined") {
            if (formContext.getAttribute("rsa_insuredscountryofdomicile").getValue() !== null) {
                domicile = formContext.getAttribute("rsa_insuredscountryofdomicile").getValue()[0].name;
            }
        }
        if (IsMandatory === true && domicile === "GB - United Kingdom") {
            formContext.getAttribute("rsa_legaltitlecompanytype").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_legaltitlecompanytype").setRequiredLevel("none");
        }
        RSA.D365CRM.SLOpportunity.Main.CompaniesHouseRefNumberFieldMandatoryCheck(executionContext);

        if (OptStage === "Diverted" || OptStage === "Renewal Work-Up") {
            var cyRsaWrittenAttr = formContext.getAttribute("rsa_cyrsawritten");
            if (cyRsaWrittenAttr) {
                cyRsaWrittenAttr.setRequiredLevel("none");
            }
        }

    },
    //Fields mandatory at stage 3
    FieldsMandatoryAtStageThree: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var IsMandatory = false;
        //  var arr1 = ['rsa_customer', 'rsa_brokername', 'rsa_customertype', 'rsa_datequotereceived', 'rsa_gbm', 'rsa_pl', 'rsa_policylength', 'rsa_policyexpirydate', 'rsa_policystartdate', 'rsa_underwritertrader', 'rsa_londonregionslloyds'];
        //  var arr2 = ['rsa_cypolrsashare', 'rsa_poltri'];
        // var arr2_1 = ['rsa_brokertargetpremiumpc', 'rsa_whatistheirlegaltitle', 'rsa_cyterrorismpremiumgross100ptcpc', 'rsa_cyterrorismcommissionpctrsashare', 'rsa_estimatedsigningpercentage', 'rsa_companieshouserefnumbercharitynumber', 'rsa_siccodedescription', 'rsa_cytri', 'rsa_cyorder', 'rsa_basecommissionpercent', 'rsa_basecommission', 'rsa_cygwp100exgrossupsandterrorismpc', 'rsa_datetermsissuedtobrokercustomer', 'rsa_distribution', 'rsa_distributionmethod', 'rsa_fullvalueprimaryxolquotashare', 'rsa_insuredscountryofdomicile', 'rsa_macquariepolicy', 'rsa_methodofplacement', 'rsa_territorialexposure', 'rsa_typeofcontact', 'rsa_whatistheirtradelookup', 'rsa_brokerpresentationchannel', 'rsa_datetermsrequiredbybrokercustomer'];
        var arr3 = ['rsa_policycurrency', 'rsa_cypolgwp100exgrossupsandterrorismpc', 'rsa_stampsapplicable', 'rsa_cycoinsurancecoreinsurancepc', 'rsa_cover', 'rsa_cycaptivepremiumpc', 'rsa_profitsharepc', 'rsa_profitshare', 'rsa_cycoinsurancecoreinsurance', 'rsa_aggregatelimitpc', 'rsa_isatpahandlingwithintheselfinsuredorcapti', 'rsa_caseexchangerate', 'rsa_feesadditionaltopremiumgsl1', 'rsa_riskengineeringfee', 'rsa_riskmanagementbursarypc', 'rsa_technicalpremiumpc100', 'rsa_rsaexternalreinsuranceinclpanelpc', 'rsa_cyfacri', 'rsa_leadofficeoverriderpc', 'rsa_servicingofficeoverriderpc', 'rsa_leadfollow', 'rsa_longtermagreement', 'rsa_manufacturingstatus', 'rsa_methodofpayment', 'rsa_methodofpayments', 'rsa_name', 'rsa_policysystemcode', 'rsa_wordingtype', 'rsa_typeofcontact'];
        //var controlArray1 = arr1.concat(arr2);
        //var controlArray2 = controlArray1.concat(arr2_1);
        var controlArray = arr3;

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" || OptStage === "Renewal Work-Up") {
            IsMandatory = true;
        }
        else {
            IsMandatory = false;
        }
        RSA.D365CRM.SLCommon.Main.MakeFieldsMandatoryNonMandatory(executionContext, controlArray, IsMandatory);

        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageTwo(executionContext); //calling Stage 2 method
        RSA.D365CRM.SLOpportunity.Main.FieldsMandatoryAtStageOne(executionContext); //calling Stage 1 method

        var pl, GBM, Distribution;

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }

        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {
            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }

        var captivePremium = 0;
        if (formContext.getAttribute("rsa_cycaptivepremiumpc") !== null && formContext.getAttribute("rsa_cycaptivepremiumpc") !== "undefined") {
            if (formContext.getAttribute("rsa_cycaptivepremiumpc").getValue() !== null) {
                captivePremium = formContext.getAttribute("rsa_cycaptivepremiumpc").getValue();
            }
        }
        var AggregateLimit = 0;
        if (formContext.getAttribute("rsa_aggregatelimitpc") !== null && formContext.getAttribute("rsa_aggregatelimitpc") !== "undefined") {
            if (formContext.getAttribute("rsa_aggregatelimitpc").getValue() !== null) {
                AggregateLimit = formContext.getAttribute("rsa_aggregatelimitpc").getValue();
            }
        }

        var IsTPAHandling = false;
        if (formContext.getAttribute("rsa_isatpahandlingwithintheselfinsuredorcapti") !== null && formContext.getAttribute("rsa_isatpahandlingwithintheselfinsuredorcapti") !== "undefined") {
            if (formContext.getAttribute("rsa_isatpahandlingwithintheselfinsuredorcapti").getValue() !== null) {
                IsTPAHandling = formContext.getAttribute("rsa_isatpahandlingwithintheselfinsuredorcapti").getValue();
            }
        }
        var DateTermsAgreed;
        if (formContext.getAttribute("rsa_quotecontractcertainty") !== null && formContext.getAttribute("rsa_quotecontractcertainty") !== "undefined") {
            if (formContext.getAttribute("rsa_quotecontractcertainty").getValue() !== null) {
                DateTermsAgreed = formContext.getAttribute("rsa_quotecontractcertainty").getValue();
            }
        }
        var PolicyStartdate;
        if (formContext.getAttribute("rsa_policystartdate") !== null && formContext.getAttribute("rsa_policystartdate") !== "undefined") {
            if (formContext.getAttribute("rsa_policystartdate").getValue() !== null) {
                PolicyStartdate = formContext.getAttribute("rsa_policystartdate").getValue();
            }
        }
        var leadfollow;
        if (formContext.getAttribute("rsa_leadfollow") !== null && formContext.getAttribute("rsa_leadfollow") !== "undefined") {
            if (formContext.getAttribute("rsa_leadfollow").getValue() !== null) {
                leadfollow = formContext.getAttribute("rsa_leadfollow").getText();
            }
        }
        var DateEvidence;
        if (formContext.getAttribute("rsa_policycontractcertainty") !== null && formContext.getAttribute("rsa_policycontractcertainty") !== "undefined") {
            if (formContext.getAttribute("rsa_policycontractcertainty").getValue() !== null) {
                DateEvidence = formContext.getAttribute("rsa_policycontractcertainty").getValue();
            }
        }

        var LongTermAgreement;
        if (formContext.getAttribute("rsa_longtermagreement") !== null && formContext.getAttribute("rsa_longtermagreement") !== "undefined") {
            if (formContext.getAttribute("rsa_longtermagreement").getValue() !== null) {
                LongTermAgreement = formContext.getAttribute("rsa_longtermagreement").getValue();
            }
        }
        var wordingType;
        if (formContext.getAttribute("rsa_wordingtype") !== null && formContext.getAttribute("rsa_wordingtype") !== "undefined") {
            if (formContext.getAttribute("rsa_wordingtype").getValue() !== null) {
                wordingType = formContext.getAttribute("rsa_wordingtype").getText();
            }
        }

        if (IsMandatory === true) {

            if (captivePremium > 0) {
                formContext.getAttribute("rsa_captivedeductiblepc").setRequiredLevel("required");
                formContext.getAttribute("rsa_captiveaggregatelimitpc").setRequiredLevel("required");
                formContext.getAttribute("rsa_captivecontact").setRequiredLevel("required");
                formContext.getAttribute("rsa_captivedeductiblefrontedornonfronted").setRequiredLevel("required");

            } else {
                formContext.getAttribute("rsa_captivedeductiblepc").setRequiredLevel("none");
                formContext.getAttribute("rsa_captiveaggregatelimitpc").setRequiredLevel("none");
                formContext.getAttribute("rsa_captivecontact").setRequiredLevel("none");
                formContext.getAttribute("rsa_captivedeductiblefrontedornonfronted").setRequiredLevel("none");
            }

            if (AggregateLimit > 0) {
                formContext.getAttribute("rsa_nonrankingdeductiblepc").setRequiredLevel("required");
                formContext.getAttribute("rsa_rankingdeductiblepc").setRequiredLevel("required");
                formContext.getAttribute("rsa_nonrankingdeductibleinclusiveorexclusiveo").setRequiredLevel("required");
                formContext.getAttribute("rsa_continuingdeductiblepc").setRequiredLevel("required");
                formContext.getAttribute("rsa_deductiblefrontedornonfronted").setRequiredLevel("required");

            } else {
                formContext.getAttribute("rsa_nonrankingdeductiblepc").setRequiredLevel("none");
                formContext.getAttribute("rsa_rankingdeductiblepc").setRequiredLevel("none");
                formContext.getAttribute("rsa_nonrankingdeductibleinclusiveorexclusiveo").setRequiredLevel("none");
                formContext.getAttribute("rsa_continuingdeductiblepc").setRequiredLevel("none");
                formContext.getAttribute("rsa_deductiblefrontedornonfronted").setRequiredLevel("none");
            }

            if (IsTPAHandling === true) {
                formContext.getAttribute("rsa_nameoftpa").setRequiredLevel("required");
                formContext.getAttribute("rsa_contactattpa").setRequiredLevel("required");
                formContext.getAttribute("rsa_ukclaimshandlingonly").setRequiredLevel("required");
                formContext.getAttribute("rsa_referraltorsa").setRequiredLevel("required");
            }
            else {
                formContext.getAttribute("rsa_nameoftpa").setRequiredLevel("none");
                formContext.getAttribute("rsa_contactattpa").setRequiredLevel("none");
                formContext.getAttribute("rsa_ukclaimshandlingonly").setRequiredLevel("none");
                formContext.getAttribute("rsa_referraltorsa").setRequiredLevel("none");
            }

            var formattedDateTermsAgreed = new Date(DateTermsAgreed);
            var formattedPolicyStartdate = new Date(PolicyStartdate);
            if (leadfollow === "Lead" && formattedDateTermsAgreed > formattedPolicyStartdate) {
                formContext.getAttribute("rsa_quoteccreasonforfailure").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_quoteccreasonforfailure").setRequiredLevel("none");
            }
            var formatDateEvidence = new Date(DateEvidence);
            formattedPolicyStartdate.setDate(formattedPolicyStartdate.getDate() + 21);

            if (formatDateEvidence > formattedPolicyStartdate) {
                formContext.getAttribute("rsa_evidenceofcovereocreasonforfailure").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_evidenceofcovereocreasonforfailure").setRequiredLevel("none");
            }
            if (leadfollow === "Follow") {
                formContext.getAttribute("rsa_leadinsurers").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_leadinsurers").setRequiredLevel("none");
                formContext.getAttribute("rsa_leadinsurers").setValue(null);
            }

            if (LongTermAgreement === true) {
                formContext.getAttribute("rsa_contractdurationyears").setRequiredLevel("required");
                formContext.getAttribute("rsa_ltastatus").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_contractdurationyears").setRequiredLevel("none");
                formContext.getAttribute("rsa_ltastatus").setRequiredLevel("none");
                formContext.getAttribute("rsa_contractdurationyears").setValue(null);
            }
            if (wordingType === "RSA wording") {
                formContext.getAttribute("rsa_productname").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_productname").setRequiredLevel("none");
            }

            //debugger;
            //policy section
            if (formContext.getAttribute("rsa_policy").getValue() !== null) {
                setTimeout(function () {
                    if (formContext.ui.controls.get("rsa_policy1") !== null) {
                        let policycomponent = formContext.ui.controls.get("rsa_policy1");
                        if (policycomponent && policycomponent.getAttribute) {
                            policycomponent.getAttribute("rsa_policysystemcode").setRequiredLevel("required");


                            if (pl === "Marine" || pl === "Engineering & Renewable Energy") {
                                policycomponent.getAttribute("rsa_policyrenewaldate").setRequiredLevel("required");
                            } else {
                                policycomponent.getAttribute("rsa_policyrenewaldate").setRequiredLevel("none");
                            }
                        }
                    }
                }, 5000); //delay of 5000 milliseconds (5 seconds)

            }

        } else {
            if (formContext.getAttribute("rsa_policy").getValue() !== null) {
                setTimeout(function () {
                    if (formContext.ui.controls.get("rsa_policy1") !== null) {
                        let policycomponent = formContext.ui.controls.get("rsa_policy1");
                        if (policycomponent && policycomponent.getAttribute) {
                            policycomponent.getAttribute("rsa_policysystemcode").setRequiredLevel("none");
                            policycomponent.getAttribute("rsa_policyrenewaldate").setRequiredLevel("none");
                        }
                    }
                }, 5000);  //delay of 5000 milliseconds (5 seconds)               
            }
        }
        RSA.D365CRM.SLOpportunity.Main.CompaniesHouseRefNumberFieldMandatoryCheck(executionContext);
    },

    // Support flag field validation
    supportflagFieldValidation: function (executionContext) {
        var formContext = executionContext.getFormContext();
        if (formContext.getAttribute("rsa_reasonableadjustmentdetail") !== null && formContext.getAttribute("rsa_reasonableadjustmentdetail") !== "undefined") {
            if (formContext.getAttribute("rsa_reasonableadjustmentdetail").getValue() !== null) {
                formContext.getAttribute("rsa_supportflag").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_supportflag").setRequiredLevel("none");
            }
        }

    },
    // NAICS Code field mandatory
    NAICSCodefieldmandatory: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        if (formContext.ui.controls.get("rsa_customer1") !== null) {
            setTimeout(function () {
                let customercomponent = formContext.ui.controls.get("rsa_customer1");
                if (formContext.getAttribute("rsa_insuredscountryofdomicile") !== null && formContext.getAttribute("rsa_insuredscountryofdomicile") !== "undefined") {
                    if (formContext.getAttribute("rsa_insuredscountryofdomicile").getValue() !== null) {
                        var Domicile = formContext.getAttribute("rsa_insuredscountryofdomicile").getValue()[0].name;
                        if (Domicile === "US - United States" || Domicile === "MX - Mexico" || Domicile === "CA - Canada") {
                            if (customercomponent && customercomponent.getAttribute) {
                                customercomponent.getAttribute("rsa_naicscode").setRequiredLevel("required");
                            } else {
                                customercomponent.getAttribute("rsa_naicscode").setRequiredLevel("none");
                            }
                        } else {
                            customercomponent.getAttribute("rsa_naicscode").setRequiredLevel("none");
                        }
                    } else {
                        customercomponent.getAttribute("rsa_naicscode").setRequiredLevel("none");
                    }
                }
            }, 5000);  //delay of 5000 milliseconds (5 seconds)
        }
    },
    // Filter the policy system code
    FilterPolicyAdminSystemCode: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var UKRIS = { value: 866760001, text: "UKRIS" };
        var ATLAS = { value: 866760004, text: "ATLAS" };
        var SYNERGY = { value: 866760005, text: "SYNERGY" };
        var ECLIPSE = { value: 866760008, text: "ECLIPSE" };

        var EPOQ = { value: 866760006, text: "EPOQ" };
        var SICLOPS = { value: 866760003, text: "SICLOPS" };
        var SICS = { value: 866760002, text: "SICS" };
        var ASSURE = { value: 866760007, text: "ASSURE C&S" };
        var AIS = { value: 866760000, text: "AIS" };
        var PORTIA = { value: 866760051, text: "(I) PORTIA" };
        var RDC = { value: 866760052, text: "(I) RDC" };
        var Genius = { value: 866760053, text: "(I) Genius" };
        var Live = { value: 866760054, text: "(I) Live" };
        var Cancelled = { value: 866760055, text: "(I) Cancelled" };
        var Premium = { value: 866760056, text: "(I) Premium" };

        var pl, GBM;

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }


        if (formContext.getAttribute("rsa_policy").getValue() !== null) {
            if (formContext.ui.controls.get("rsa_policy1") !== null) {
                let policycomponent = formContext.ui.controls.get("rsa_policy1");
                if (policycomponent && policycomponent.getAttribute) {
                    setTimeout(function () {

                        let policysystemcontrol = policycomponent.getControl("rsa_policysystemcode");
                        policysystemcontrol.clearOptions();
                        policysystemcontrol.addOption(UKRIS);
                        policysystemcontrol.addOption(ATLAS);
                        policysystemcontrol.addOption(SYNERGY);
                        policysystemcontrol.addOption(ECLIPSE);
                        policysystemcontrol.addOption(EPOQ);
                        policysystemcontrol.addOption(SICLOPS);
                        policysystemcontrol.addOption(SICS);
                        policysystemcontrol.addOption(ASSURE);
                        policysystemcontrol.addOption(AIS);
                        policysystemcontrol.addOption(PORTIA);
                        policysystemcontrol.addOption(RDC);
                        policysystemcontrol.addOption(Genius);
                        policysystemcontrol.addOption(Live);
                        policysystemcontrol.addOption(Cancelled);
                        policysystemcontrol.addOption(Premium);


                        if (pl === "Marine") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(SYNERGY);

                        } else if (pl === "Group PA & Business Travel") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(UKRIS);


                        } else if (pl === "Engineering & Renewable Energy" || "SL Casualty") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(ATLAS);

                        }

                        if (GBM === "Risk Managed UK Property") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(ATLAS);

                        } else if (GBM === "Real Estate") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(ATLAS);
                            policysystemcontrol.addOption(UKRIS);

                        } else if (GBM === "International Wholesale") {
                            policysystemcontrol.clearOptions();
                            policysystemcontrol.addOption(ATLAS);
                            policysystemcontrol.addOption(ECLIPSE);

                        }
                    }, 5000);
                }
            }

        }

    },
    makeCYExchangeRateBlank: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var prgmCurrency = formContext.getAttribute("rsa_policycurrency").getValue()
        if (prgmCurrency == null) {
            formContext.getAttribute("rsa_cyexchangerate").setValue(null)
        }
    },

    ProgCurrencyMandatory: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" || OptStage === "Accepted - TBU" || OptStage === "Quoted" || OptStage === "Lapsed" || OptStage === "Not taken Up") {
            formContext.getAttribute("rsa_policycurrency").setRequiredLevel("required");
            formContext.getAttribute("rsa_technicalpremiumpc100").setRequiredLevel("required");
        }
        else {
            formContext.getAttribute("rsa_policycurrency").setRequiredLevel("none");
            formContext.getAttribute("rsa_technicalpremiumpc100").setRequiredLevel("none");
        }

    },
    IssuedMandatory: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Diverted" || OptStage === "Declined to Renew") {
            formContext.getAttribute("rsa_datetermsissuedtobrokercustomer").setRequiredLevel("none");
        }

    },

    // Adding Tooltip for multiselect option set value
    AddingTooltip: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var attributeName = "rsa_territorialexposure";
        var control = formContext.getControl(attributeName);
        /*if (control) {

            // var container = document.querySelector("select[data-id='" + attributeName + "']");
            //  if (container) {

            var options = document.querySelectorAll("select[data-id='" + attributeName + "']");
            options.forEach(function (option) {

                option.setAttribute("title", "this is test tool tip");
            });

            //      }


        }*/
        var exposure = formContext.getAttribute(attributeName).getText();
        if (exposure !== null && exposure.includes("Complex Multinational")) {
            control.addNotification({
                messages: ['Complex Multinational - Variable orders and commission input where local retentions apply'],
                notificationLevel: 'RECOMMENDATION',
                uniqueId: 'my_unique_id'
            });
        }
        else {
            control.clearNotification('my_unique_id');
        }

    },
    CertaintyReasonFieldMandatoryCheck: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var PolicyStartDate = formContext.getAttribute("rsa_policystartdate").getValue();
        var IssuedDate = formContext.getAttribute("rsa_quotecontractcertainty").getValue();
        var IsLead = formContext.getAttribute("rsa_leadfollow").getValue();

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage === "Accepted" && IsLead === 866760000) {
            if (PolicyStartDate < IssuedDate) {
                formContext.getAttribute("rsa_quoteccreasonforfailure").setRequiredLevel("required");
            } else {
                formContext.getAttribute("rsa_quoteccreasonforfailure").setRequiredLevel("none");
            }
        }
        else {
            formContext.getAttribute("rsa_quoteccreasonforfailure").setRequiredLevel("none");
        }

    },
    SetProductFieldValue: function (executionContext) {
        try {

            var formContext = executionContext.getFormContext();

            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {

                var GBMValue = formContext.getAttribute("rsa_gbm").getValue()[0].name;
                if (GBMValue === "Real Estate") {
                    formContext.getAttribute("rsa_productname").setValue(866760005);
                }
                else {
                    formContext.getAttribute("rsa_productname").setValue(866760000);
                }
            }
            if (formContext.getAttribute("rsa_gbm").getValue() == null) {
                formContext.getAttribute("rsa_productname").setValue(null);
            }
        }
        catch (err) {
            Xrm.Navigation.openAlertDialog({ text: "SetProductFieldValue-" + err.message });
        }
    },
    SetDomicileOfCountryMandatory: function (executionContext) {
        try {

            var formContext = executionContext.getFormContext();
            if (formContext.getAttribute("rsa_typeofcontact") !== "undefined" && formContext.getAttribute("rsa_typeofcontact") !== null) {
                var typeOfContract = formContext.getAttribute("rsa_typeofcontact").getValue();

                if (typeOfContract && typeOfContract.length > 0) {
                    // Reinsurance Treaty, Reinsurance FAC , Retrocession Insurance
                    var hasSelected = typeOfContract.includes(912660003) || typeOfContract.includes(912660004) || typeOfContract.includes(912660005)
                    if (hasSelected) {
                        formContext.getAttribute("rsa_domicileofreinsured").setRequiredLevel("required");
                    } else {
                        formContext.getAttribute("rsa_domicileofreinsured").setRequiredLevel("none");
                    }
                } else {
                    formContext.getAttribute("rsa_domicileofreinsured").setRequiredLevel("none");
                }
            }

        }
        catch (err) {
            Xrm.Navigation.openAlertDialog({ text: "SetDomicileOfCountryMandatory-" + err.message });
        }
    },
    YachtFieldsMandatoryCheck: function (executionContext) {
        //debugger;
        var formContext = executionContext.getFormContext();
        var CurrentRecordID = formContext.data.entity.getId().replace("{", "").replace("}", "");
        // var GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;

        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        var GBM;
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        if (GBM === "Yacht") {
            formContext.getControl("rsa_sicsection").setVisible(false);
            formContext.getControl("rsa_sicdivision").setVisible(false);
            formContext.getControl("rsa_siccodedescription").setVisible(false);
            formContext.getControl("rsa_whatistheirtradelookup").setVisible(false);
            formContext.getAttribute("rsa_whatistheirtradelookup").setRequiredLevel("none");

        }

        var req1 = new XMLHttpRequest();
        req1.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/rsa_yachts?$select=rsa_name,statecode,rsa_hullvaluepc,rsa_increasedvalueivpc,rsa_warvaluetotalpc,rsa_deductible&$filter=_rsa_slopportunity_value eq " + CurrentRecordID, false);
        req1.setRequestHeader("OData-MaxVersion", "4.0");
        req1.setRequestHeader("OData-Version", "4.0");
        req1.setRequestHeader("Accept", "application/json");
        req1.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req1.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req1.onreadystatechange = function () {

            if (this.readyState === 4) {
                req1.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);

                    //debugger;

                    if (GBM === "Yacht" && OptStage === "Accepted") {

                        if (results.value.length > 0) {

                            for (var i = 0; i < results.value.length; i++) {

                                var hullvaluepc = results.value[i]["rsa_hullvaluepc"];
                                var increasedvalueivpc = results.value[i]["rsa_increasedvalueivpc"];
                                var warvaluetotalpc = results.value[i]["rsa_warvaluetotalpc"];
                                var deductible = results.value[i]["rsa_deductible"];
                                var yacht = results.value[i]["rsa_name"];
                                var status = results.value[i]["statecode"];

                                if (status === 0) {
                                    if (hullvaluepc == null || increasedvalueivpc == null || warvaluetotalpc == null || deductible == null) {

                                        formContext.ui.setFormNotification("Please fill mandatory fields of associated " + yacht + " yacht record", "INFO", "yatchmandatory");
                                    }
                                }

                            }
                        }


                    }
                    else {
                        formContext.ui.clearFormNotification("yatchmandatory");
                    }

                }
            }

        };
        req1.send();
    },

    // === E&RE exposure total must equal 100% ===
    TotalEnREExposureValidator: function (executionContext, opts) {
        var formContext = executionContext.getFormContext();

        var plAttr = formContext.getAttribute("rsa_pl");
        var plName = null;
        if (plAttr && plAttr.getValue() && plAttr.getValue().length > 0) {
            plName = plAttr.getValue()[0].name;
        }
        var stageAttr = formContext.getAttribute("rsa_opportunitystage");
        var stageText = null;
        if (stageAttr && stageAttr.getValue() !== null) {
            stageText = stageAttr.getText();
        }

        if (plName === "Engineering & Renewable Energy" && stageText === "Accepted") {
            var fields = [
                "rsa_coalexposure", "rsa_gasexposure", "rsa_oilexposure", "rsa_dieselexposure",
                "rsa_windexposure", "rsa_solarexposure", "rsa_hydroexposure", "rsa_geothermalexposure",
                "rsa_bioexposure", "rsa_bessexposure", "rsa_otherexposure"
            ];
            var EPSILON = 0.01;
            var total = 0;

            function num(v) { return (v === null || v === undefined) ? 0 : Number(v); }

            fields.forEach(function (f) {
                var a = formContext.getAttribute(f);
                total += a ? num(a.getValue()) : 0;
            });


            formContext.getAttribute("rsa_totalexposure").setValue(Math.round(total * 100) / 100);

            // Real-time banner
            var warnId = "enre_total_warn";
            if (Math.abs(total - 100) > EPSILON) {
                formContext.ui.setFormNotification(
                    "Total exposure is " + total.toFixed(2) + "%. Total exposure % must add up to 100",
                    "WARNING",
                    warnId
                );
                // Inline nudges (optional, helps accessibility)
                fields.forEach(function (f) {
                    var c = formContext.getControl(f);
                    if (c) c.setNotification("All exposures together must equal 100%");
                });
            } else {
                formContext.ui.clearFormNotification(warnId);
                fields.forEach(function (f) {
                    var c = formContext.getControl(f);
                    if (c) c.clearNotification();
                });
            }

            // Hard stop on save / stage progression when asked
            if (opts && opts.blockIfInvalid === true && Math.abs(total - 100) > EPSILON) {
                var eventArgs = executionContext.getEventArgs();
                if (eventArgs && eventArgs.preventDefault) {
                    eventArgs.preventDefault();
                }
                // Promote message as ERROR at save time so itâ€™s obvious
                formContext.ui.setFormNotification("Total exposure % must add up to 100", "ERROR", warnId);
                return false;
            }
            return true;
        }

    },
    SetPolicyLength: function (executionContext) {
        try {
            var formContext = executionContext.getFormContext();

            var startDate = formContext.getAttribute("rsa_policystartdate")?.getValue();
            var endDate = formContext.getAttribute("rsa_policyexpirydate")?.getValue();
            var ogLengthField = formContext.getAttribute("rsa_policylength")?.getValue();
            var lengthField = formContext.getAttribute("rsa_policylengthdummy");

            if (!startDate || !endDate) return;


            const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            const expiryTimestamp = endDate.getTime();
            const renewalTimestamp = startDate.getTime();
            const policyLengthInDays = (expiryTimestamp - renewalTimestamp) / millisecondsInDay;

            // Convert days to months (assuming 30 days per month)
            const policyLengthInMonths = Math.round(policyLengthInDays / 30);

            if (ogLengthField != policyLengthInMonths || ogLengthField == null) {
                lengthField.setValue(policyLengthInMonths);
            }



        }
        catch (e) {
            Xrm.Navigation.openAlertDialog({ text: "Error in SetPolicyLength: " + e.message });
        }
    },

    ShowHideSuretyTab: function (executionContext) {

        var formContext = executionContext.getFormContext();
        if (formContext.getAttribute("rsa_pl").getValue() !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            var pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
        }
        if (pl === "Surety") {
            formContext.ui.tabs.get("Surety").setVisible(true);
        }
        else {
            formContext.ui.tabs.get("Surety").setVisible(false);
        }

    },
    ShowHidewicfinancefields: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var pl, Distribution;
        var IsVisible = true;
        var SetNullValue = false;
        var controlArray = ['rsa_cycaptivepremiumpc', 'rsa_cyinternalreinsurancepc', 'rsa_cycoinsurancecoreinsurance', 'rsa_cycoinsurancecoreinsurancepc', 'rsa_worktransferfeeip', 'rsa_worktransferfeepc', 'rsa_profitshare', 'rsa_profitsharepc'];

        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_distribution") !== null && formContext.getAttribute("rsa_distribution") !== "undefined") {
            if (formContext.getAttribute("rsa_distribution").getValue() !== null) {
                Distribution = formContext.getAttribute("rsa_distribution").getText();
            }
        }

        if (pl === "SL Casualty" && Distribution === "Wholesale Broker/Partner") {
            IsVisible = false;
            SetNullValue = true;
        }

        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, SetNullValue);
    },
    CompaniesHouseRefNumberFieldMandatoryCheck: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var IsMandatory = true;
        var IsVisible = false;
        var SetNullValue = false;
        var controlArray = ['rsa_companieshouserefnumbercharitynumber'];

        var customerType;
        if (formContext.getAttribute("rsa_customertype") !== null && formContext.getAttribute("rsa_customertype") !== "undefined") {
            if (formContext.getAttribute("rsa_customertype").getValue() !== null) {
                customerType = formContext.getAttribute("rsa_customertype").getText();
            }
        }

        var countryDomicile;
        if (formContext.getAttribute("rsa_insuredscountryofdomicile") !== null && formContext.getAttribute("rsa_insuredscountryofdomicile") !== "undefined") {
            if (formContext.getAttribute("rsa_insuredscountryofdomicile").getValue() !== null) {
                countryDomicile = formContext.getAttribute("rsa_insuredscountryofdomicile").getValue()[0].name;
            }
        }

        if (customerType === "Consumer") {
            IsMandatory = false;
        }

        if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            var opportunitystage = formContext.getAttribute("rsa_opportunitystage").getText();
            if ((IsMandatory === true) && (opportunitystage === "Quoted" || opportunitystage === "Accepted" || opportunitystage === "Accepted - TBU" || opportunitystage === "Renewal Work-Up") && (countryDomicile === "GB - United Kingdom")) {
                IsMandatory = true
            } else {
                IsMandatory = false;
            }
        } else {
            IsMandatory = false;
        }

        if (IsMandatory === true && countryDomicile === "GB - United Kingdom") {
            formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").setRequiredLevel("required");
        } else {
            formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").setRequiredLevel("none");
        }

        if (countryDomicile === "GB - United Kingdom") {
            IsVisible = true;
        } else {
            IsVisible = false;
        }

        if (formContext.getAttribute("rsa_companieshouserefnumbercharitynumber") !== null && formContext.getAttribute("rsa_companieshouserefnumbercharitynumber") !== "undefined") {
            if (formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").getValue() !== null) {

                var fieldValue = formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").getValue().trim();

                var isInteger = /^[-+]?\d+$/.test(fieldValue);
                var isNotKnown = fieldValue.toLowerCase() === "not known";

                var notAllowedTextList = ["tbc", "na", "n/a", "no", "not", "tbd", "0"];
                var notAllowedTexts = notAllowedTextList.includes(fieldValue.toLowerCase());

                if ((!isInteger && !isNotKnown) || notAllowedTexts) {
                    Xrm.Navigation.openAlertDialog({ text: "A valid Companies House Ref. Number / Charity Number must be provided. If this information is not available, please enter 'Not Known'." });
                    formContext.getAttribute("rsa_companieshouserefnumbercharitynumber").setValue(null);
                    return;
                }
            }
        }

        RSA.D365CRM.SLCommon.Main.ShowHideFormFields(executionContext, controlArray, IsVisible, SetNullValue);
    },
    CalculateBackGroundFieldForGrpShare: function (executionContext) {
    var formContext = executionContext.getFormContext();
    var SRC_CYORDER = "rsa_cyorder";
    var SRC_WRITTEN = "rsa_cyrsawritten";
    var SRC_SIGNING = "rsa_estimatedsigningpercentage";


    var SRC_GWP = "rsa_cygwp100exgrossupsandterrorismpc";
    var TGT_FIELD = "rsa_cygwprsasharebackgroundfield";

    var cyOrderAttr = formContext.getAttribute(SRC_CYORDER);
    var writtenAttr = formContext.getAttribute(SRC_WRITTEN);
    var signingAttr = formContext.getAttribute(SRC_SIGNING);
    var gwpAttr     = formContext.getAttribute(SRC_GWP);
    var tgtAttr     = formContext.getAttribute(TGT_FIELD);

    if (!cyOrderAttr || !writtenAttr || !signingAttr || !gwpAttr || !tgtAttr) return;

    var cyOrder    = cyOrderAttr.getValue();
    var written    = writtenAttr.getValue();
    var signingPct = signingAttr.getValue();
    var gwp        = gwpAttr.getValue();

    if (cyOrder === null || written === null || signingPct === null || gwp === null) {
        tgtAttr.setValue(null);
        return;
    }

    var shareValue = (cyOrder * written * signingPct) / 10000;

    var captivePremiumAttr = formContext.getAttribute("rsa_cycaptivepremiumpc");
    var polGwpAttr         = formContext.getAttribute("rsa_cypolgwp100exgrossupsandterrorismpc");
    var polRsaShareAttr    = formContext.getAttribute("rsa_cypolrsashare");

    var captivePremium = (captivePremiumAttr && captivePremiumAttr.getValue() !== null) ? captivePremiumAttr.getValue() : 0;
    var polGwp         = (polGwpAttr         && polGwpAttr.getValue()         !== null) ? polGwpAttr.getValue()         : 0;
    var polRsaShare    = (polRsaShareAttr     && polRsaShareAttr.getValue()    !== null) ? polRsaShareAttr.getValue()    : 0;

    var step1 = (gwp - captivePremium - polGwp) * (shareValue / 100);
    var step2 = polGwp * (polRsaShare / 100);
    var finalValue = Math.round((step1 + step2) * 100) / 100;


    tgtAttr.setValue(finalValue);
    tgtAttr.fireOnChange();
	},
    CalculateCommisionFields: function (executionContext) {
        var formContext = executionContext.getFormContext();

        var calfield = formContext.getAttribute("rsa_cygwprsashareexgrossupsandterrorismpc").getValue();
        var bacField = formContext.getAttribute("rsa_cygwprsasharebackgroundfield").getValue();

        var premium = (bacField == null ? calfield : bacField);

        function setIfChanged(attrName, value) {
            var a = formContext.getAttribute(attrName);
            if (!a) return;

            var current = a.getValue();

            if (current === null && (value === null || value === undefined)) return;

            if (typeof current === "number" && typeof value === "number") {
                if (Math.abs(current - value) < 0.0000001) return;
            } else if (current === value) {
                return;
            }
            a.setValue(value);
        }

        if (premium === null || premium === undefined) {
            setIfChanged("rsa_basecommissionpc", null);
            setIfChanged("rsa_worktransferfeepc", null);
            setIfChanged("rsa_isbpc", null);
            return;
        }


        if (premium === 0) {

            var bcPct = formContext.getAttribute("rsa_basecommissionpercent")?.getValue();
            var wtfPct = formContext.getAttribute("rsa_worktransferfeeip")?.getValue();
            var isbPct = formContext.getAttribute("rsa_isb")?.getValue();

            setIfChanged("rsa_basecommissionpc", (bcPct === null || bcPct === undefined) ? null : 0);
            setIfChanged("rsa_worktransferfeepc", (wtfPct === null || wtfPct === undefined) ? null : 0);
            setIfChanged("rsa_isbpc", (isbPct === null || isbPct === undefined) ? null : 0);
            return;
        }

        var sourceName = null;
        try {
            var src = executionContext.getEventSource && executionContext.getEventSource();
            sourceName = src && src.getName ? src.getName() : null;
        } catch (e) {
            sourceName = null;
        }

        var pairs = [
            { pct: "rsa_basecommissionpercent", amt: "rsa_basecommissionpc" },
            { pct: "rsa_worktransferfeeip", amt: "rsa_worktransferfeepc" },
            { pct: "rsa_isb", amt: "rsa_isbpc" }
        ];

        pairs.forEach(function (p) {
            var pctAttr = formContext.getAttribute(p.pct);
            var amtAttr = formContext.getAttribute(p.amt);
            if (!pctAttr || !amtAttr) return;

            var pctVal = pctAttr.getValue();
            var amtVal = amtAttr.getValue();

            var sourceIsPct = (sourceName === p.pct);
            var sourceIsAmt = (sourceName === p.amt);

            var pctMissing = (pctVal === null || pctVal === undefined);
            var amtMissing = (amtVal === null || amtVal === undefined);

            if (sourceIsAmt) {
                // pct = (amt / premium) * 100
                if (amtMissing) {
                    setIfChanged(p.pct, null);
                } else {
                    setIfChanged(p.pct, (amtVal / premium) * 100);
                }
                return;
            }

            if (sourceIsPct) {
                // amt = premium * (pct / 100)
                if (pctMissing) {
                    setIfChanged(p.amt, null);
                } else {
                    setIfChanged(p.amt, premium * (pctVal / 100));
                }
                return;
            }

            // Neither field was the event source; fill missing side if the other exists (including 0)
            if (pctMissing && !amtMissing) {
                setIfChanged(p.pct, (amtVal / premium) * 100);
            } else if (amtMissing && !pctMissing) {
                setIfChanged(p.amt, premium * (pctVal / 100));
            }
        });

        function round2(v) {
            return Math.round(v * 100) / 100;
        }

        function calcPc(pctFieldName, pcFieldName) {
            var pctAttr = formContext.getAttribute(pctFieldName);
            if (!pctAttr) return;

            var pctVal = pctAttr.getValue();

            // === FIX: 0 should produce PC = 0, not null (applies to ALL) ===
            if (pctVal === null || pctVal === undefined) {
                setIfChanged(pcFieldName, null); // or 0 per your SL pattern
                return;
            }

            var pcVal = round2(premium * (pctVal / 100));
            setIfChanged(pcFieldName, pcVal);
        }


        calcPc("rsa_basecommissionpercent", "rsa_basecommissionpc");
        calcPc("rsa_worktransferfeeip", "rsa_worktransferfeepc");
        calcPc("rsa_isb", "rsa_isbpc");
    },


    showCreatePolicyPopUp: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var policy = formContext.getAttribute("rsa_policy")
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }

        if (OptStage == "Accepted" && Xrm.Page.getAttribute("rsa_policy").getValue() == null) {
            var alertStrings = { confirmButtonLabel: "OK", text: "SL Policy will be created in the background give few mins and refresh the form", title: "SL Policy Creation" };
            Xrm.Navigation.openAlertDialog(alertStrings).then(
                function (success) {
                    console.log("Alert dialog closed");
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }

    },
    hideShowCyTriField:function(executionContext){
         var formContext = executionContext.getFormContext();
          var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage == "Renewed" || OptStage == "Renewal Work-Up" || OptStage == "Renewal Work-Up"){
                formContext.getControl("rsa_cytri").setVisible(true);
                 formContext.getAttribute("rsa_cytri").setRequiredLevel("required");

        }else{
               formContext.getControl("rsa_cytri").setVisible(false);
                 formContext.getAttribute("rsa_cytri").setRequiredLevel("none");
        }

    },

    hideShowPolicy: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var policy = formContext.getAttribute("rsa_policy")
        var OptStage;
        if (formContext.getAttribute("rsa_opportunitystage") !== null && formContext.getAttribute("rsa_opportunitystage") !== "undefined") {
            if (formContext.getAttribute("rsa_opportunitystage").getValue() !== null) {
                OptStage = formContext.getAttribute("rsa_opportunitystage").getText();
            }
        }
        if (OptStage == "Accepted" || OptStage == "Renewal Work-Up" && formContext.getAttribute("rsa_policy").getValue() != null) {
            formContext.getControl("rsa_policy").setVisible(true);
            //formContext.getAttribute("rsa_policy").setRequiredLevel("required");
            formContext.getControl("rsa_policy").setDisabled(true);

        }
        else {
            formContext.getControl("rsa_policy").setVisible(false);
            formContext.getAttribute("rsa_policy").setRequiredLevel("none");
        }
    },
    filterOpportunityStage: function (formContext, defaultStageOptions) {

        var recordTypeValue = formContext.getAttribute("rsa_recordtype").getValue();

        var stageCtrl = formContext.getControl("rsa_opportunitystage");

        if (!stageCtrl) return;

        if (recordTypeValue === null) {

            stageCtrl.clearOptions();

            defaultStageOptions.forEach(function (o) {

                stageCtrl.addOption(o);

            });

            stageCtrl.setDisabled(false);

            return;

        }
        stageCtrl.clearOptions();

        if (recordTypeValue === 866760000) {
            stageCtrl.addOption({ value: 866760000, text: "Accepted" });
            stageCtrl.addOption({ value: 866760001, text: "Accepted - TBU" });
            stageCtrl.addOption({ value: 866760003, text: "Diverted" });
            stageCtrl.addOption({ value: 866760004, text: "In Play" });
            stageCtrl.addOption({ value: 866760006, text: "No Longer Required" });
            stageCtrl.addOption({ value: 866760007, text: "Not taken Up" });
            stageCtrl.addOption({ value: 866760008, text: "Pipeline" });
            stageCtrl.addOption({ value: 866760009, text: "Quoted" });
            stageCtrl.addOption({ value: 866760011, text: "Quoted - VRI" });
            stageCtrl.addOption({ value: 866760010, text: "Transfer out to CL" });

        } else if (recordTypeValue === 866760001) {
            stageCtrl.addOption({ value: 866760013, text: "Renewed" });
            stageCtrl.addOption({ value: 866760014, text: "Renewed - TBU" });
            stageCtrl.addOption({ value: 866760002, text: "Declined to Renew" });
            stageCtrl.addOption({ value: 866760005, text: "Lapsed" });
            stageCtrl.addOption({ value: 866760006, text: "No Longer Required" });
            stageCtrl.addOption({ value: 866760009, text: "Quoted" });
            stageCtrl.addOption({ value: 866760010, text: "Transfer out to CL" });
            stageCtrl.addOption({ value: 866760012, text: "Renewal Work-Up" });
        }

        stageCtrl.setDisabled(false);

    },

    filterSLOpportunityStage: function (formContext) {
        var recordTypeValue = formContext.getAttribute("rsa_recordtype").getValue();
        var stageCtrl = formContext.getControl("rsa_slopportunitystage");
        if (!recordTypeValue || !stageCtrl) return;
        if (stageCtrl._filterHandler) {
            stageCtrl.removePreSearch(stageCtrl._filterHandler);
        }
        stageCtrl._filterHandler = function () {
            var filter = "<filter type='or'>" +
                "<condition attribute = 'rsa_opportunitystagetype' operator = 'like' value = '" + recordTypeValue + "' /> " +
                "<condition attribute='rsa_opportunitystagetype' operator='like' value='" + recordTypeValue + ",%' />" +
                "<condition attribute='rsa_opportunitystagetype' operator='like' value='%," + recordTypeValue + "' />" +
                "<condition attribute='rsa_opportunitystagetype' operator='like' value='%," + recordTypeValue + ",%' />" +
                "</filter > ";
            stageCtrl.addCustomFilter(filter, "rsa_slopportunitystage");
        };
        stageCtrl.addPreSearch(stageCtrl._filterHandler);

    },

    lockBpfRecordTypeOnSave: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var bpfFieldName = "rsa_recordtype";
        var attribute = formContext.getAttribute(bpfFieldName);
        if (attribute && attribute.getValue() !== null) {
            var controls = attribute.controls.getAll();
            controls.forEach(function (control) {
                control.setDisabled(true);
            });
        }

    },
requireProjectTypeBasedOnEar: function (executionContext) {
        ////debugger;
        var formContext = executionContext.getFormContext();
        var pl,covervalarr,GBM;
        if (formContext.getAttribute("rsa_pl") !== null && formContext.getAttribute("rsa_pl") !== "undefined") {
            if (formContext.getAttribute("rsa_pl").getValue() !== null) {
                pl = formContext.getAttribute("rsa_pl").getValue()[0].name;
            }
        }
        if (formContext.getAttribute("rsa_cover") !== null && formContext.getAttribute("rsa_cover") !== "undefined") {
            if (formContext.getAttribute("rsa_cover").getValue() !== null) {
                covervalarr = formContext.getAttribute("rsa_cover").getText();
            }
        }
        if (formContext.getAttribute("rsa_gbm") !== null && formContext.getAttribute("rsa_gbm") !== "undefined") {
            if (formContext.getAttribute("rsa_gbm").getValue() !== null) {
                GBM = formContext.getAttribute("rsa_gbm").getValue()[0].name;
            }
        }
        
        if (covervalarr !== undefined) {
        
            if (pl === "Engineering & Renewable Energy" && covervalarr.includes("EAR") && GBM == "Specialty Engineering & Renewable Energy") {
                  formContext.getAttribute("rsa_projecttype").setRequiredLevel("required");
                  formContext.getControl("rsa_projecttype").setVisible(true);
            		
            }
		else {
                formContext.getControl("rsa_projecttype").setVisible(false);
                formContext.getAttribute("rsa_projecttype").setRequiredLevel("none");
            		}
        }
        else{
        formContext.getControl("rsa_projecttype").setVisible(false);
                formContext.getAttribute("rsa_projecttype").setRequiredLevel("none");
        }
    }


});
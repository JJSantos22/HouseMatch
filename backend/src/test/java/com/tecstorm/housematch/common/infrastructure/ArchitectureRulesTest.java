package com.tecstorm.housematch.common.infrastructure;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(
    packages = "com.tecstorm.housematch",
    importOptions = ImportOption.DoNotIncludeTests.class
)
class ArchitectureRulesTest {

    @ArchTest
    static final ArchRule api_should_not_depend_on_infrastructure =
        noClasses()
            .that().resideInAPackage("com.tecstorm.housematch..api..")
            .should().dependOnClassesThat().resideInAPackage("com.tecstorm.housematch..infrastructure..");

    @ArchTest
    static final ArchRule repositories_should_only_be_used_from_application_or_infrastructure =
        noClasses()
            .that().resideOutsideOfPackages(
                "com.tecstorm.housematch..application..",
                "com.tecstorm.housematch..infrastructure.."
            )
            .should().dependOnClassesThat().haveSimpleNameEndingWith("Repository");

    @ArchTest
    static final ArchRule legacy_layer_packages_must_not_exist =
        noClasses()
            .should().resideInAnyPackage(
                "com.tecstorm.housematch.controller..",
                "com.tecstorm.housematch.service..",
                "com.tecstorm.housematch.repository..",
                "com.tecstorm.housematch.entities..",
                "com.tecstorm.housematch.dto..",
                "com.tecstorm.housematch.integration.."
            );
}

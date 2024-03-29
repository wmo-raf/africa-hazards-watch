import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import sortBy from "lodash/sortBy";

import CountryDataProvider from "providers/country-data-provider";
import Input from "components/forms/components/input";
import Select from "components/forms/components/select";

import Checkbox from "components/forms/components/checkbox";
import Radio from "components/forms/components/radio";

import Submit from "components/forms/components/submit";
import ConfirmationMessage from "components/confirmation-message";
import Button from "components/ui/button";
import Error from "components/forms/components/error";

import {
  email as validateEmail,
  hasValidOption,
} from "components/forms/validations";

import {
  sectors,
  howDoYouUse,
  interests,
  scaleOfOperations,
  typeOfOrganization,
} from "./config";

import "./styles.scss";

class ProfileForm extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    countries: PropTypes.array,
    saveProfile: PropTypes.func,
    source: PropTypes.string,
  };

  render() {
    const { initialValues, countries, saveProfile, source } = this.props;
    const sectorsOptions = sectors.map((s) => ({
      label: s,
      value: s,
    }));

    const interestsOptions = interests.map((s) => ({
      label: s,
      value: s,
    }));

    const typeOfOrgOptions = typeOfOrganization.map((t) => ({
      label: t,
      value: t,
    }));

    const scaleOfOperationsOptions = scaleOfOperations.map((s) => ({
      label: s,
      value: s,
    }));

    return (
      <Fragment>
        <Form
          onSubmit={saveProfile}
          initialValues={initialValues}
          render={({
            handleSubmit,
            valid,
            submitting,
            submitFailed,
            submitError,
            submitSucceeded,
            form: { reset },
            values = {},
          }) => (
            <form className="c-profile-form" onSubmit={handleSubmit}>
              <div className="row">
                {submitSucceeded ? (
                  <div className="column small-12">
                    <ConfirmationMessage
                      title="Thank you for updating your My HW profile!"
                      description="You may wish to read our <a href='/privacy' target='_blank'>privacy policy</a>, which provides further information about how we use personal data."
                    />
                    <Button
                      className="reset-form-btn"
                      onClick={() => {
                        reset();
                      }}
                    >
                      Back to my profile
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    <div className="column small-12">
                      <h1>Your profile</h1>
                      <h3>
                        We use this information to make Hazards Watch
                        more useful for you. Your privacy is important to us and
                        we&apos;ll never share your information without your
                        consent.
                      </h3>
                    </div>
                    <div className="column small-12">
                      <Input name="firstName" label="first name" />
                      <Input
                        name="lastName"
                        label="last name / surname"
                        required
                      />
                      <Radio
                        name="gender"
                        label="Gender"
                        options={[
                          { label: "Male", value: "M" },
                          { label: "Female", value: "F" },
                        ]}
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        label="email"
                        placeholder="example@hazardswatch.org"
                        validate={[validateEmail]}
                        required
                      />
                      <Select
                        name="sector"
                        label="sector"
                        options={sectorsOptions}
                        placeholder="Select a sector"
                        validate={[
                          (value) => hasValidOption(value, sectorsOptions),
                        ]}
                        required
                        selectInput={
                          values.sector && values.sector.includes("Other")
                        }
                      />
                      <p className="section-name">Your organization Details</p>
                      <Input
                        name="organization"
                        label="Organization / Company"
                        required
                      />
                      <Select
                        name="organizationType"
                        label="Type of Organization"
                        options={typeOfOrgOptions}
                        placeholder="Select type of your organization"
                        validate={[
                          (value) => hasValidOption(value, typeOfOrgOptions),
                        ]}
                        required
                        selectInput={
                          values.typeOfOrganization &&
                          values.typeOfOrganization.includes("Other")
                        }
                      />
                      <Select
                        name="scaleOfOperations"
                        label="Scale of Operations"
                        options={scaleOfOperationsOptions}
                        placeholder="Select scale of operations"
                        validate={[
                          (value) =>
                            hasValidOption(value, scaleOfOperationsOptions),
                        ]}
                        required
                      />

                      <Input name="position" label="Position" />
                      <p className="section-name">Where are you located?</p>
                      <Select
                        name="country"
                        label="country"
                        options={countries}
                        placeholder="Select a country"
                        required
                      />
                      <Input name="city" label="city" />
                      {/* <Checkbox
                        name="interests"
                        label="What topics are you interested in?"
                        options={interestsOptions}
                        required
                      /> */}
                      {/* <Checkbox
                        name="howDoYouUse"
                        label="how do you use east africa hazards watch?"
                        options={[
                          ...sortBy(
                            howDoYouUse.map((r) => ({
                              label: r,
                              value: r,
                            })),
                            "label"
                          ),
                          { label: "Other", value: "Other" },
                        ]}
                        selectInput={
                          values.howDoYouUse &&
                          values.howDoYouUse.includes("Other")
                        }
                        required
                      /> */}
                      {/* <Checkbox
                        name="signUpToNewsletter"
                        options={[
                          {
                            label:
                              'Subscribe to monthly HW newsletters and updates based on your interests.',
                            value: true
                          }
                        ]}
                      />
                      {values.signUpToNewsletter && (
                        <Select
                          name="topics"
                          label="I’m interested in receiving communications about"
                          options={topics}
                          required
                          multiple
                        />
                      )} */}
                      <Error
                        valid={valid}
                        submitFailed={submitFailed}
                        submitError={submitError}
                      />
                      <Submit submitting={submitting}>
                        {source === "AreaOfInterestModal" ? "next" : "save"}
                      </Submit>
                    </div>
                    <div className="column small-12">
                      <p className="delete-profile">
                        <a href="mailto:ahw@hazardswatch.org">
                          Email us{" "}
                        </a>
                        to delete your MyHw account.
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
            </form>
          )}
        />
        <CountryDataProvider />
      </Fragment>
    );
  }
}

export default ProfileForm;
